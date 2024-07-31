import styles from "./styles.module.scss";
import { Input } from "../ui/input";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <div className={styles.searchBar}>
      <Input
        type="text"
        placeholder="Search products..."
        onChange={handleChange}
      />
    </div>
  );
}
