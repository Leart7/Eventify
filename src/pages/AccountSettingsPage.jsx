import AccountInformation from "../features/AccountSettings/AccountInformation";
import ContactInfo from "../features/AccountSettings/ContactInfo";
import Navbar from "../ui/Navbar";

function AccountSettingsPage() {
  return (
    <>
      <Navbar />
      <ContactInfo />
      <AccountInformation />
    </>
  );
}

export default AccountSettingsPage;
