import NavBar from "@/components/NavBar";

const Layout = async ({children} : {children: React.ReactNode}) => {
  return (
    <div>
      <NavBar />
      {children}
    </div>
  )
}

export default Layout;