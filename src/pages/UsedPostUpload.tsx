import React, { useRef, useState } from "react";
import { used_DB } from "../api/usedFirebase";
import { push, ref, set } from "firebase/database";

const UsedPostUpload: React.FC = () => {
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [uploadImages, setUploadImages] = useState<string[]>([]);
  const [itemName, setItemName] = useState("");
  const [size, setSize] = useState("");
  const [price, setPrice] = useState<number>(1000);
  const [quantity, setQuantity] = useState<number>(1);
  const [shippingIncluded, setShippingIncluded] = useState(false);
  const [productCondition, setProductCondition] = useState("used");
  const [description, setDescription] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const urlFile = URL.createObjectURL(file);
      console.log(urlFile);
      setPreviewImages((prevImages) => prevImages.concat(urlFile));

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const base64data = reader.result;
        if (base64data) {
          setUploadImages((prevImages) => prevImages.concat(base64data));
          console.log(base64data);
        }
      };
    }
  };

  const removeImage = (index: number) => {
    URL.revokeObjectURL(previewImages[index]); // 이미지 URL 해제
    setPreviewImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const onClickUsedItemUpload = () => {
    const db = used_DB;
    const usedItemRef = ref(db, "usedItems");
    const newItems = push(usedItemRef);
    set(newItems, {
      description,
      imageArr: uploadImages,
      isSales: false,
      itemId: `${itemName}_${Math.floor(Math.random() * 100)}`,
      itemName,
      options: [
        shippingIncluded ? "배송비 포함" : "배송비 비포함",
        productCondition === "used" ? "중고상품" : "새상품",
      ],
      price,
      quantity,
      reviews: [],
      seller: {
        sellerId: "seller1",
        userName: "ahellyer0",
        nickname: "aclawsley0",
        userAvatar:
          "https://robohash.org/autemautemvel.png?size=50x50&set=set1",
        address: "70140 Sunnyside Plaza",
        phone: "010-8433-9597",
      },
      size,
    });

    console.log({
      description,
      imageArr: uploadImages,
      isSales: false,
      itemId: `${itemName}_${Math.floor(Math.random() * 100)}`,
      itemName,
      options: [
        shippingIncluded ? "배송비 포함" : "배송비 비포함",
        productCondition === "used" ? "중고상품" : "새상품",
      ],
      price,
      quantity,
      reviews: [],
      seller: {},
      size,
    });
  };

  return (
    <div className="h-[100vh] w-[600px] p-8 text-left mb-40">
      <h1 className="text-3xl font-bold mb-5 ">상품등록 </h1>

      {/* 사진등록 */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          사진 등록
        </label>
        <div className="flex space-x-2">
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            className="mb-4 hidden"
            ref={fileInputRef}
          />
          <div
            onClick={() => fileInputRef.current?.click()}
            className="w-20 h-20 bg-gray-300 flex items-center justify-center text-2xl text-gray-500 cursor-pointer"
          >
            +
          </div>
          {previewImages.map((image, index) => (
            <div
              key={index}
              className="w-20 h-20 bg-gray-200 relative flex items-center justify-center"
            >
              <img
                src={image}
                alt={`uploaded ${index}`}
                className="object-cover w-full h-full"
              />
              <button
                onClick={() => removeImage(index)}
                className="absolute top-0 right-0 p-1 text-xs text-gray-500"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* input type등록 */}
      <div className="">
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700">
            상품명
          </label>
          <input
            type="text"
            value={itemName}
            onChange={(e) => {
              setItemName(e.target.value);
            }}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            placeholder="상품명을 입력하세요"
          />
        </div>
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700">
            가격
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => {
              setPrice(Number(e.target.value));
            }}
            min={1000}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            placeholder="가격을 입력하세요"
          />
        </div>
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700">
            수량
          </label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => {
              setQuantity(Number(e.target.value));
            }}
            min={1}
            max={30}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            placeholder="1"
          />
        </div>
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700">
            사이즈
          </label>
          <input
            type="text"
            value={size}
            onChange={(e) => {
              setSize(e.target.value);
            }}
            max={30}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            placeholder="사이즈를 입력하세요"
          />
        </div>
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            배송비
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="shipping"
                value="included"
                checked={shippingIncluded}
                onChange={() => setShippingIncluded(true)}
                className="form-radio"
              />
              <span className="ml-2">배송비 포함</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="shipping"
                value="notIncluded"
                checked={!shippingIncluded}
                onChange={() => setShippingIncluded(false)}
                className="form-radio"
              />
              <span className="ml-2">배송비 비포함</span>
            </label>
          </div>
        </div>
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            물품 상태
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="condition"
                value="new"
                checked
                onChange={() => setProductCondition("new")}
                className="form-radio"
              />
              <span className="ml-2">새상품</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="condition"
                value="used"
                checked={productCondition === "used"}
                onChange={() => setProductCondition("used")}
                className="form-radio"
              />
              <span className="ml-2">중고상품</span>
            </label>
          </div>
        </div>
        <div className="mb-8 h-[200px]">
          <label className="block text-sm font-medium text-gray-700">
            설명
          </label>
          <textarea
            className="mt-1 block min-h-[150px] w-full resize-none border border-gray-300 rounded-md p-4 focus:outline-none"
            placeholder="상품 설명을 입력하세요"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button
          onClick={onClickUsedItemUpload}
          className="w-full h-[45px] py-2 px-4 bg-[#8F5BBD] text-white rounded-md"
        >
          등록하기
        </button>
      </div>
    </div>
  );
};

export default UsedPostUpload;
