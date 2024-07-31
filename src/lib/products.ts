export async function getProductDetails(id: string) {
  const response = await fetch(`http://localhost:3000/api/products/${id}`);
  const data = await response.json();

  if (data.success) {
    return data;
  } else {
    throw new Error("something went wrong");
  }
}
