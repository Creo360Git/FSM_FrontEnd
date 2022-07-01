import VerticalTab from "./VerticalTab"
import People from '@mui/icons-material/People';
import PermissionManagement from "./Permission/PermissionManagement";
import Users from "./User/Users";


const ApplicationConfig = () => {
    
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

    return(
        <VerticalTab 
            data={data}
            panels={[<PermissionManagement />, <Users />]}
        />
    )
}
export default ApplicationConfig