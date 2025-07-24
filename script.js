async function loadItems() {
  const res = await fetch('/api/items');
  const items = await res.json();
  const list = document.getElementById('itemList');
  list.innerHTML = '';
  items.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `${item} <span onclick="deleteItem('${item}')">🗑️</span>`;
    list.appendChild(li);
  });
}

async function addItem() {
  const input = document.getElementById('itemInput');
  const name = input.value.trim();
  if (!name) return alert("Enter item name!");
  await fetch('/api/items', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name })
  });
  input.value = '';
  loadItems();
}

async function deleteItem(name) {
  await fetch(`/api/items/${name}`, { method: 'DELETE' });
  loadItems();
}

loadItems();
