import useBreadcrumbs from "use-react-router-breadcrumbs";
import { Link as RouterLink } from "react-router-dom";
import { Breadcrumbs, Link, LinkProps } from "@mui/material";

interface LinkRouterProps extends LinkProps {
  to: string;
  replace?: boolean;
}

const routes = [
  { path: "/", breadcrumb: "ホーム" },
  { path: "/users", breadcrumb: "ユーザー一覧" },
  { path: "/posts", breadcrumb: "記事一覧" },
  {
    path: "/posts/:postId",
    breadcrumb: "記事",
  },
];

const LinkRouter = (props: LinkRouterProps) => (
  <Link {...props} component={RouterLink as any} />
);

const Bread = (): JSX.Element => {
  const breadcrumbs = useBreadcrumbs(routes);
  return (
    <>
      <Breadcrumbs>
        {breadcrumbs.map(({ match, breadcrumb, location }, index) => {
          // 最後のパスはリンクしないようにする
          const pathNames = location.pathname.split("/").filter((x) => x);
          const last = index === pathNames.length;

          return last ? (
            <span key={match.pathname}>{breadcrumb}</span>
          ) : (
            <span key={match.pathname}>
              <LinkRouter underline="hover" color="primary" to={match.pathname}>
                {breadcrumb}
              </LinkRouter>
            </span>
          );
        })}
      </Breadcrumbs>
    </>
  );
};
export default Bread;
