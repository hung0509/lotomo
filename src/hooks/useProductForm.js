import { useEffect, useState } from "react";
import { useProduct } from "./useProduct";
import { useOptionGroup } from "./useOptionGroup";
import { useIngredient } from "./useIngredient";

const mockData = [
  {
    id: 1,
    name: "Size",
    items: [
      { id: 1, name: "M", price: 0 },
      { id: 2, name: "L", price: 5000 },
    ],
  },
  {
    id: 2,
    name: "Topping",
    items: [
      { id: 3, name: "Trân châu", price: 5000 },
      { id: 4, name: "Kem cheese", price: 7000 },
    ],
  },
];

const mockCategories = [{ id: 1000000, name: "Matcha" }];

const mockIngredients = [
  { id: 1, name: "Matcha", unit: "g" },
  { id: 2, name: "Sữa", unit: "ml" },
  { id: 3, name: "Đường", unit: "g" },
  { id: 4, name: "Trân châu", unit: "g" },
  { id: 5, name: "Đá", unit: "g" },
];

export const useProductForm = (id) => {
  const isEdit = !!id;

  const { createProduct, updateProduct, findById } = useProduct();
  const { fetchAll } = useOptionGroup();
  const { fetchAllIngredient } = useIngredient();

  const [groups, setGroups] = useState([]);
  const [categories, setCategories] = useState([]);
  const [ingredients, setIngredients] = useState(mockIngredients);
  const [selectedItems, setSelectedItems] = useState([]);
  const [recipes, setRecipes] = useState({});
  const [expanded, setExpanded] = useState({});
  const [selectedRecipeItem, setSelectedRecipeItem] = useState(null);

  const [form, setForm] = useState({
    name: "",
    price: "",
    image: "",
    categoryId: "",
    status: "ACTIVE",
  });

  useEffect(() => {
    setCategories(mockCategories);

    if (isEdit) {
      const fetchData = async () => {
        try {
          const res = await findById(id);
          const resIngredient = await fetchAllIngredient();

          setSelectedItems(res.selectedItems || []);
          setGroups(res.options || mockData);
          setIngredients(resIngredient || mockIngredients);
          setRecipes(res.recipes || {});

          setForm({
            name: res.name || "",
            price: res.price || "",
            image: res.image || "",
            categoryId: res.categoryId || "",
            status: res.status || "ACTIVE",
          });
        } catch (err) {
          console.log("API lỗi → dùng mock");
          setGroups(mockData);
          setIngredients(mockIngredients);
        }
      };

      fetchData();
    } else {
      const fetchData = async () => {
        try {
          const res = await fetchAll();
          const resIngredient = await fetchAllIngredient();

          setGroups(res || mockData);
          setIngredients(resIngredient || mockIngredients);
        } catch {
          setGroups(mockData);
          setIngredients(mockIngredients);
        }
      };

      fetchData();
    }
  }, [id]);

  return {
    isEdit,
    form,
    setForm,
    groups,
    setGroups,
    categories,
    ingredients,
    selectedItems,
    setSelectedItems,
    recipes,
    setRecipes,
    expanded,
    setExpanded,
    selectedRecipeItem,
    setSelectedRecipeItem,
    createProduct,
    updateProduct,
  };
};