export class NetCoreClaimTypes {
    private static ClaimTypeNamespace: string = "http://schemas.microsoft.com/ws/2008/06/identity/claims";
    public static AuthenticationInstant: string = NetCoreClaimTypes.ClaimTypeNamespace + "/authenticationinstant";
    public static AuthenticationMethod: string = NetCoreClaimTypes.ClaimTypeNamespace + "/authenticationmethod";
    public static CookiePath: string = NetCoreClaimTypes.ClaimTypeNamespace + "/cookiepath";
    public static DenyOnlyPrimarySid: string = NetCoreClaimTypes.ClaimTypeNamespace + "/denyonlyprimarysid";
    public static DenyOnlyPrimaryGroupSid: string = NetCoreClaimTypes.ClaimTypeNamespace + "/denyonlyprimarygroupsid";
    public static DenyOnlyWindowsDeviceGroup: string = NetCoreClaimTypes.ClaimTypeNamespace + "/denyonlywindowsdevicegroup";
    public static Dsa: string = NetCoreClaimTypes.ClaimTypeNamespace + "/dsa";
    public static Expiration: string = NetCoreClaimTypes.ClaimTypeNamespace + "/expiration";
    public static Expired: string = NetCoreClaimTypes.ClaimTypeNamespace + "/expired";
    public static GroupSid: string = NetCoreClaimTypes.ClaimTypeNamespace + "/groupsid";
    public static IsPersistent: string = NetCoreClaimTypes.ClaimTypeNamespace + "/ispersistent";
    public static PrimaryGroupSid: string = NetCoreClaimTypes.ClaimTypeNamespace + "/primarygroupsid";
    public static PrimarySid: string = NetCoreClaimTypes.ClaimTypeNamespace + "/primarysid";
    public static Role: string = NetCoreClaimTypes.ClaimTypeNamespace + "/role";
    public static SerialNumber: string = NetCoreClaimTypes.ClaimTypeNamespace + "/serialnumber";
    public static UserData: string = NetCoreClaimTypes.ClaimTypeNamespace + "/userdata";
    public static Version: string = NetCoreClaimTypes.ClaimTypeNamespace + "/version";
    public static WindowsAccountName: string = NetCoreClaimTypes.ClaimTypeNamespace + "/windowsaccountname";
    public static WindowsDeviceClaim: string = NetCoreClaimTypes.ClaimTypeNamespace + "/windowsdeviceclaim";
    public static WindowsDeviceGroup: string = NetCoreClaimTypes.ClaimTypeNamespace + "/windowsdevicegroup";
    public static WindowsUserClaim: string = NetCoreClaimTypes.ClaimTypeNamespace + "/windowsuserclaim";
    public static WindowsFqbnVersion: string = NetCoreClaimTypes.ClaimTypeNamespace + "/windowsfqbnversion";
    public static WindowsSubAuthority: string = NetCoreClaimTypes.ClaimTypeNamespace + "/windowssubauthority";
    //
    // From System.IdentityModel.Claims
    //
    private static ClaimType2005Namespace: string = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims";
    public static Anonymous: string = NetCoreClaimTypes.ClaimType2005Namespace + "/anonymous";
    public static Authentication: string = NetCoreClaimTypes.ClaimType2005Namespace + "/authentication";
    public static AuthorizationDecision: string = NetCoreClaimTypes.ClaimType2005Namespace + "/authorizationdecision";
    public static Country: string = NetCoreClaimTypes.ClaimType2005Namespace + "/country";
    public static DateOfBirth: string = NetCoreClaimTypes.ClaimType2005Namespace + "/dateofbirth";
    public static Dns: string = NetCoreClaimTypes.ClaimType2005Namespace + "/dns";
    public static DenyOnlySid: string = NetCoreClaimTypes.ClaimType2005Namespace + "/denyonlysid"; // NOTE: shown as 'Deny only group SID' on the ADFSv2 UI!
    public static Email: string = NetCoreClaimTypes.ClaimType2005Namespace + "/emailaddress";
    public static Gender: string = NetCoreClaimTypes.ClaimType2005Namespace + "/gender";
    public static GivenName: string = NetCoreClaimTypes.ClaimType2005Namespace + "/givenname";
    public static Hash: string = NetCoreClaimTypes.ClaimType2005Namespace + "/hash";
    public static HomePhone: string = NetCoreClaimTypes.ClaimType2005Namespace + "/homephone";
    public static Locality: string = NetCoreClaimTypes.ClaimType2005Namespace + "/locality";
    public static MobilePhone: string = NetCoreClaimTypes.ClaimType2005Namespace + "/mobilephone";
    public static Name: string = NetCoreClaimTypes.ClaimType2005Namespace + "/name";
    public static NameIdentifier: string = NetCoreClaimTypes.ClaimType2005Namespace + "/nameidentifier";
    public static OtherPhone: string = NetCoreClaimTypes.ClaimType2005Namespace + "/otherphone";
    public static PostalCode: string = NetCoreClaimTypes.ClaimType2005Namespace + "/postalcode";
    public static Rsa: string = NetCoreClaimTypes.ClaimType2005Namespace + "/rsa";
    public static Sid: string = NetCoreClaimTypes.ClaimType2005Namespace + "/sid";
    public static Spn: string = NetCoreClaimTypes.ClaimType2005Namespace + "/spn";
    public static StateOrProvince: string = NetCoreClaimTypes.ClaimType2005Namespace + "/stateorprovince";
    public static StreetAddress: string = NetCoreClaimTypes.ClaimType2005Namespace + "/streetaddress";
    public static Surname: string = NetCoreClaimTypes.ClaimType2005Namespace + "/surname";
    public static System: string = NetCoreClaimTypes.ClaimType2005Namespace + "/system";
    public static Thumbprint: string = NetCoreClaimTypes.ClaimType2005Namespace + "/thumbprint";
    public static Upn: string = NetCoreClaimTypes.ClaimType2005Namespace + "/upn";
    public static Uri: string = NetCoreClaimTypes.ClaimType2005Namespace + "/uri";
    public static Webpage: string = NetCoreClaimTypes.ClaimType2005Namespace + "/webpage";
    public static X500DistinguishedName: string = NetCoreClaimTypes.ClaimType2005Namespace + "/x500distinguishedname";

    private static ClaimType2009Namespace: string = "http://schemas.xmlsoap.org/ws/2009/09/identity/claims";
    public static Actor: string = NetCoreClaimTypes.ClaimType2009Namespace + "/actor";
}