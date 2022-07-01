import DashboardLayout from "../components/Common/Layouts/DashboardLayout"
import SettingTab from "../components/Setting/SettingTab"
import VerticalTab from "../components/Setting/VerticalTab"



const Settings = () => {
    return(
        <DashboardLayout heading="Settings">
            <SettingTab />
        </DashboardLayout>
    )
}
export default Settings