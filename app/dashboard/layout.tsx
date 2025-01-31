import NavBar from "@/app/ui/dashboard/navbar";

export default function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <>
        <NavBar />
        <main>{children}</main>
        </>
    );
}