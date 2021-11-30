import ContentLoader from "react-content-loader";

export const HouseSkeleton = () => (
  <ContentLoader height={600} style={{ width: "100%" }}>
    <rect rx="0" ry="0" width="3" x="400" y="5" height="700" />
    <rect rx="0" ry="0" width="3" x="15" y="5" height="700" />
    <rect rx="0" ry="0" width="385" height="3" x="15" y="5" />
    <rect rx="0" ry="0" width="385" height="3" x="15" y="597" />
    <rect rx="0" ry="0" width="385" x="15" height="300" y="5" />
    <rect rx="0" ry="0" height="25" width="300" x="65" y="385" />
    <rect rx="0" ry="0" y="440" width="150" x="65" height="20" />
    <rect rx="0" ry="0" height="10" x="65" y="490" width="220" />
  </ContentLoader>
);
