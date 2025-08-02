import { Main } from "@/components/layout/main";
import { postgrest } from "@/lib/postgrest";
import ClientRoleMenu from "./client";
import { auth } from "@/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Role Menu",
  description: "Access your work",
};

export default async function RoleMenu() {
  const session = await auth();
  if (!session) return <div>Not authenticated</div>;
  const { data: pages_list } = await postgrest.from("page_list").select("*");

  const pages = [
    {
      id: 1,
      app_name: "amogaappz",
      page_icon_name: "User",
      page_link: "/login-block",
      page_name: "Login",
    },
    {
      id: 2,
      app_name: "amogaappz",
      page_icon_name: "User",
      page_link: "/signup-block",
      page_name: "Signup",
    },
    {
      id: 3,
      app_name: "amogaappz",
      page_icon_name: "User",
      page_link: "/chat",
      page_name: "Chat",
    },
  ];

  return (
    <div className="bg-background">
      <Main fixed>
        <div>
          <p className="text-muted-foreground">Access your work</p>
        </div>

        <ClientRoleMenu
          // pages_list={
          //   pages_list?.filter((page) => {
          //     if (!page?.role_json && !Array.isArray(page.role_json)) {
          //       return false;
          //     }

          //     return (
          //       page?.role_json &&
          //       page.role_json.some((role: string) =>
          //         session?.user?.roles_json?.includes(role)
          //       )
          //     );
          //   }) || []
          // }
          pages_list={pages}
        />
        {/* <Input placeholder="Filter pages" className="h-9 w-40 lg:w-[250px]" />
        {pages_list.map((page, index) => (
          <div key={index} className="grid mt-5  grid-cols-3">
            <Card>
              <CardContent>{page}</CardContent>
            </Card>
          </div>
        ))} */}
      </Main>
    </div>
  );
}
