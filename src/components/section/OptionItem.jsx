export default function OptionItem({ item, selectedItems, toggleItem, openRecipeModal }) {
  const checked = selectedItems.includes(item.id);

  return (
    <div className="flex justify-between bg-white p-2 rounded">
      <div>
        {item.name}
        <p className="text-xs text-green-600">+{item.price}</p>
      </div>

      <div className="flex gap-2">
        {checked && (
          <button onClick={() => openRecipeModal(item)}>⚙</button>
        )}

        <input
          type="checkbox"
          checked={checked}
          onChange={() => toggleItem(item.id)}
        />
      </div>
    </div>
  );
}