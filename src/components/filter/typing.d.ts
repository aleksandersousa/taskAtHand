import { User } from "../../models";

export interface FilterProps {
  anchorEl: Element | null;
  user: { user: User } | null;
  currentUser: User | null;
  onConfirm: (sortBy?: FilterState) => void;
  onClose: (arg?: unknown) => void;
}

export type FilterState = {
  value: string;
}
