import fs from 'fs';

let Id = 0;
const path = "./src/data/products.json";
let products = [];

const addProduct = async (product) => {
  const {title, description, price, img, code, stock} = product;
  await getProduct();
  if (!title || !description || !price || !img || !code || !stock) {
    //verificar campos obligatorios
    console.log("Todos los campos son obligatorios");
    return;
  }

  if (products.some(item => item.code === code)) {
    console.log("El código ya existe");
    return;
  }

  const newProduct = {
    id: ++Id, //generar un id unico para cada producto
    title,
    description,
    price,
    img,
    code,
    stock,
    status: true
  };

  products.push(newProduct); // pushea el nuevo producto a array de productos

  try {
    await fs.promises.writeFile(path, JSON.stringify(products)); //guardar los productos en un archivo JSON
  } catch (error) {
    console.log("Error al guardar el archivo", error);
  }
};



const getProduct = async (limit) => {
    const productsJson = await fs.promises.readFile(path, "utf-8"); // lee el contenido del archivo JSON
    products = JSON.parse(productsJson) || []; //asigna los productos al array
  
    if(!limit) return products;

    return products.slice(0, limit);
};



const getProductById = async (id) => {
  await getProduct(); // cargamos los productos llamando a la función getProduct
  const producto = products.find((item) => item.id === id); // buscamos el producto por id
  if (!producto) {
    console.log("Not Found");
    return null;
  }
  console.log(producto);
  return producto;
};



const guardarArchivo = async (arrayProductos) => {
  try {
    await fs.promises.writeFile(path, JSON.stringify(arrayProductos, null, 2));
  } catch (error) {
    console.log("Error al guardar el archivo", error);
  }
};



const updateProduct = async (id, dataProduct) => {
  await getProduct(); // cargamos productos con getProduct
  const index = products.findIndex(product => product.id === id); //encuentra el indice del producto con su id
  if (index === -1) {
    console.log("Producto no encontrado");
    return;
  }
  products[index] = { ...products[index], ...dataProduct }; //actualiza los productos con los nuevos datos
  await fs.promises.writeFile(path, JSON.stringify(products)); // guardamos los productos actualizados en el archivo JSON
};



const deleteProduct = async (id) => {
  await getProduct(); //cargamos productos con getProduct
  const index = products.findIndex(product => product.id === id);
  if (index === -1) {
    console.log("Producto no encontrado");
    return;
  }
  products.splice(index, 1); // creamos un nuevo array sin el producto que le pasamos el ID
  await fs.promises.writeFile(path, JSON.stringify(products));
};





export default {
    addProduct,
    getProduct,
    getProductById,
    updateProduct,
    deleteProduct
}