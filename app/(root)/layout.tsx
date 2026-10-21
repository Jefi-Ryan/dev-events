import NavBar from "@/components/NavBar";

const Layout = async ({children} : {children: React.ReactNode}) => {
  return (
    <div>
      <NavBar/>
      <div className="p-5 mt-15">
        {children}
      </div>
    </div>
  )
}

export default Layout;