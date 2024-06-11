import { useState, useEffect } from "react";

export function useStorage() {
  const [storageDatas, setStorageDatas] = useState<String>("LocalStorageData");

  return { storageDatas };
}
