import { createContext ,useState ,ReactNode} from "react";
import { ItemType } from "../types";

export const PostData = createContext(null); // Set default value as null
interface ServiceContextProviderProps {
  children: ReactNode;
}

export const PostDataProvider:React.FC<ServiceContextProviderProps> = ({ children }) => {
  const [currentItem, setCurrentItem] = useState<ItemType | null>(null); 
  const [mode, setMode] = useState(''); 
  // Use parentheses correctly
  return (
    <PostData.Provider value={{ currentItem, setCurrentItem ,setMode,mode}}>
      {children}
    </PostData.Provider>
  );
};
