import { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { CompositeScreenProps } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import ProductCard from "../components/ProductCard";
import ScreenWrapper from "../components/ScreenWrapper";
import SectionTitle from "../components/SectionTitle";
import TagChip from "../components/TagChip";
import { useTheme } from "../contexts/ThemeContext";
import { RootStackParamList } from "../navigation/StackNavigator";
import { TabsParamList } from "../navigation/TabsNavigator";
import {
  ProductCategory,
  PRODUCT_CATEGORIES,
  CATEGORY_LABELS,
} from "../utils/types/Skincare";
import { supabase } from "../services/supabaseClient";

type Props = CompositeScreenProps<
  BottomTabScreenProps<TabsParamList, "Products">,
  NativeStackScreenProps<RootStackParamList>
>;

export default function ProductsScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState<ProductCategory>("cleanser");
  const [products, setProducts] = useState<any[]>([]);

  // Actividad 5 - Get Products
  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setProducts(data);
      }
    };

    fetchProducts();
  }, []);

  // Actividad 5 - Create Product
  const handleAddProduct = async () => {
    if (!name.trim() || !brand.trim()) return;

    const { data, error } = await supabase
      .from("products")
      .insert([{ name: name.trim(), brand: brand.trim(), category }])
      .select();

    if (error) {
      console.log("Error al agregar producto:", error.message);
      return;
    }

    if (data) {
      setProducts((prev) => [data[0], ...prev]);
    }

    setName("");
    setBrand("");
    setCategory("cleanser");
    setShowForm(false);
  };

  return (
    <ScreenWrapper>
      <SectionTitle
        title="Mis Productos"
        subtitle="Registra los productos de tu rutina de skincare"
      />

      <CustomButton
        title={showForm ? "Cancelar" : "Agregar producto"}
        onPress={() => setShowForm(!showForm)}
        variant={showForm ? "secondary" : "primary"}
      />

      {showForm && (
        <View style={[styles.form, { backgroundColor: colors.inputBackground }]}>
          <Text style={[styles.formLabel, { color: colors.primary }]}>
            Nuevo producto
          </Text>
          <CustomInput
            placeholder="Nombre del producto"
            value={name}
            onChange={setName}
          />
          <CustomInput
            placeholder="Marca"
            value={brand}
            onChange={setBrand}
          />
          <Text style={[styles.categoryLabel, { color: colors.textSecondary }]}>
            Categoría
          </Text>
          <View style={styles.categoryRow}>
            {PRODUCT_CATEGORIES.map((cat) => (
              <TagChip
                key={cat}
                label={CATEGORY_LABELS[cat]}
                selected={category === cat}
                onPress={() => setCategory(cat)}
              />
            ))}
          </View>
          <CustomButton title="Guardar producto" onPress={handleAddProduct} />
        </View>
      )}

      <SectionTitle title={`Productos (${products.length})`} />

      {products.length === 0 ? (
        <Text style={[styles.empty, { color: colors.textSecondary }]}>
          Aún no tienes productos registrados. Agrega tu primer producto.
        </Text>
      ) : (
        products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onPress={() =>
              navigation.navigate("ProductDetail", { productId: product.id })
            }
          />
        ))
      )}
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  form: {
    borderRadius: 9,
    borderWidth: 1,
    borderColor: "gray",
    padding: 14,
    marginTop: 12,
    marginBottom: 8,
  },
  formLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  categoryLabel: {
    fontSize: 13,
    marginBottom: 4,
  },
  categoryRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  empty: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 14,
  },
});