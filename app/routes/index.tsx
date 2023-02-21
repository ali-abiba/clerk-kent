import { LoaderFunction } from "@remix-run/node";
import { getAuth } from "@clerk/remix/ssr.server";
import { redirect } from "react-router";
import { CreateOrganization, useOrganizationList } from "@clerk/remix";
import { useState } from "react";
import { Link } from "@remix-run/react";

export const loader: LoaderFunction  = async (args) => {
  const { userId, sessionId } = await getAuth(args);

  if(!userId) return redirect('/login')
  return null;
};

export default function Index() {
  const { organizationList, isLoaded, setActive } = useOrganizationList();
  const [newOrg, setNewOrg] = useState(false);

  if (!isLoaded) {
    return (
      <p>Wait for it....</p>
    );
  }
 
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      {organizationList.length === 0 ? 
      (
        <div>
          <h3>Looks like youre not in an organization yet, would you like to create one?</h3>
          <CreateOrganization afterCreateOrganizationUrl={'/'}/>
        </div>
      ) : (
        <><ul>
            {organizationList.map(({ organization, membership }) => (
              <li key={organization.id}>
                <h3>Organization Name: {organization.name}</h3>
                <p>Role: {membership.role}</p>
                <button onClick={() => setActive({ organization: organization })}>Make Active</button>
              </li>
            ))}
          </ul>
          <Link to={'/organization/current'}>Current Org</Link>
          
          </>
          
      )
      }
    </div>
  );
}
