import { Link } from "@mui/material";
import { Link as RouterLink } from "@tanstack/react-router";

export const Users = () => {
  return (
    <div>
      <h1>Users</h1>
      <ul className="list-disc pl-5">
        <li>
          <Link component={RouterLink} to="/users/creation-months">
            月別ユーザー登録数
          </Link>
        </li>
      </ul>
    </div>
  );
};
