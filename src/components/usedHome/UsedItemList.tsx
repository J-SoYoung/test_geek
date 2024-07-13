import React, { useEffect, useState } from "react";
import UsedItemCard from "./UsedItemCard";
import { used_DB } from "../../api/usedFirebase";
import { onValue, ref } from "firebase/database";
import { MyUsedItemType } from "../../types/usedType";

const UsedItemList = () => {
  const db = used_DB;
  const [usedItems, setUsedItems] = useState<MyUsedItemType[]>([]);

  useEffect(() => {
    const usedDataRef = ref(db, "usedItems");
    onValue(usedDataRef, (snapshop) => {
      const data = snapshop.val();
      if (data) {
        const dataArr= Object.keys(data).map((key) => data[key]);
        setUsedItems(dataArr);
      }
    });
  }, []);

  return (
    <div className="p-8 pt-4 grid grid-cols-2 gap-4 mb-24 h-[100vh]">
      {usedItems.map((item) => (
        <UsedItemCard key={item.itemId} item={item} />
      ))}
    </div>
  );
};

export default UsedItemList;
