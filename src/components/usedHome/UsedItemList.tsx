import React, { useEffect, useState } from "react";
import UsedItemCard from "./UsedItemCard";
import { used_DB } from "../../api/usedFirebase";
import { onValue, orderByKey, query, ref } from "firebase/database";
import { MyUsedItemType } from "../../types/usedType";

const UsedItemList = () => {
  const db = used_DB;
  const [usedItems, setUsedItems] = useState<MyUsedItemType[]>([]);

  useEffect(() => {
    const usedDataRef = ref(db, "usedItems");
    const sortUsedItem = query(usedDataRef, orderByKey());

    onValue(sortUsedItem, (snapshop) => {
      const data = snapshop.val();
      if (data) {
        const dataArr = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        dataArr.reverse();
        setUsedItems(dataArr);
      }
    });
  }, []);

  return (
    <div className="p-8 pt-4 grid grid-cols-2 gap-4 mb-24">
      {usedItems.map((item) => (
        <UsedItemCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default UsedItemList;
