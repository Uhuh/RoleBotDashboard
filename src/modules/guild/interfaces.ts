export interface Guild {
  feature: string[];
  id: string;
  icon: string;
  name: string;
  owner: boolean;
  permissions: number;
}

export interface IReactionRole {
  role_id: string | undefined;
  emoji_id: string | null | undefined;
  role_name: string | undefined;
  role_color: string | undefined;
  emoji_name: string | undefined;
  animated: boolean;
  isUnicode: boolean;
}