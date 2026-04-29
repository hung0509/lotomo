import OptionItem from "./OptionItem";

export default function OptionGroupList({
  groups,
  expanded,
  toggleExpand,
  selectedItems,
  toggleItem,
  openRecipeModal,
}) {
  return groups.map((group) => (
    <div key={group.id} className="bg-gray-50 rounded-xl">
      <div onClick={() => toggleExpand(group.id)} className="p-3 flex justify-between cursor-pointer">
        {group.name}
      </div>

      {expanded[group.id] && (
        <div className="p-3 grid gap-2">
          {group.items.map((item) => (
            <OptionItem
              key={item.id}
              item={item}
              selectedItems={selectedItems}
              toggleItem={toggleItem}
              openRecipeModal={openRecipeModal}
            />
          ))}
        </div>
      )}
    </div>
  ));
}