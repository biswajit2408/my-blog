import { Helmet } from 'react-helmet-async';

import { UserView } from 'src/sections/user/view';
import {useState} from "react";
import AddUser from "../sections/user/view/add-user";

// ----------------------------------------------------------------------

export default function UserPage() {
    const [showAdd, setShowAdd] = useState(false);

    const renderContent = () => {
        if (showAdd) {
            return <AddUser/>
        }
        return (<UserView handleAddUser={(value) => setShowAdd(value)}/>)
    }
  return (
    <>
      <Helmet>
        <title> RBAC | User </title>
      </Helmet>
        {renderContent()}
    </>
  );
}
