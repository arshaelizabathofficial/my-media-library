const API_URL = "http://127.0.0.1:8000/api";

export async function getItems() {
  const response = await fetch(`${API_URL}/items/`);

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
}

export async function updateItem(id, data) {
  const response = await fetch(`${API_URL}/items/${id}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Update failed: ${response.status}`);
  }

  return response.json();
}

export async function deleteItem(id) {
  const response = await fetch(`${API_URL}/items/${id}/`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`Delete failed: ${response.status}`);
  }
}
export async function createItem(itemData) {
  const response = await fetch(
    "http://127.0.0.1:8000/api/items/",
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(itemData),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();

    throw new Error(
      `Failed to create item: ${response.status} ${errorText}`
    );
  }

  return response.json();
}