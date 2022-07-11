import VerticalTab from "./VerticalTab"
import People from '@mui/icons-material/People';
import PermissionManagement from "./Permission/PermissionManagement";
import Users from "./User/Users";
import { useParams } from "react-router-dom";


const ApplicationConfig = ({parentPath}) => {
    
    // const data = [
    //     { icon: <People />, label: 'Permission management' },
    //     { icon: <People />, label: 'users' },
    //     { icon: <People />, label: 'reset password' },
    //     { icon: <People />, label: 'Store hours and holidays' },
    //     { icon: <People />, label: 'terms and conditions' },
    // ];
    const data = [
        { label: 'Permission management' },
        { label: 'users' },
        { label: 'reset password' },
        { label: 'Store hours and holidays' },
        { label: 'terms and conditions' },
        { label: 'Bulk upload' },
        { label: 'Logo' },
    ];

    const {verticalTab} = useParams()

    return(
        <VerticalTab 
            data={data}
            panels={[<PermissionManagement />, <Users />]}
            verticalTabUrls={['permission-management', 'users', 'reset-password', 'store-time', 'terms', 'bulk-upload', 'logo']}
            currentVerticalTab = {verticalTab}
            parentPath={parentPath}
        />
    )
}
export default ApplicationConfig