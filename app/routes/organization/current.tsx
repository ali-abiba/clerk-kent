import { useLoaderData } from "@remix-run/react";
import { LoaderArgs ,json } from "@remix-run/node";
import { useOrganization, useOrganizationList } from "@clerk/remix";
import { useState } from "react";

export const loader = async (params: LoaderArgs) => {
    return json({organizationId: params.params.organization});
}

export default function Current() {
    const [emailAddress, setEmailAddress] = useState('');
    const [disabled, setDisabled] = useState(false);
    
    const { 
        organization,
        membershipList,
        membership,
      } = useOrganization({
        membershipList : {}
    });
    if(!membershipList) {
        return (
            <div>Loading...</div>
        )
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        setDisabled(true);
        await organization?.inviteMember({emailAddress: emailAddress, role: 'basic_member'});
        setDisabled(false);
    }
    
    return (
        <div>
            <h2>{organization.name}</h2>
            <span>Your role: {membership.role}</span>
            <br />
            <div>
                {membership.role === 'admin' && 
                <div>
                <h3>Invite Members</h3>
                <form onSubmit={onSubmit}>
                    <input type="text" placeholder="Email Address" value={emailAddress} onChange={e => setEmailAddress(e.target.value)}/>
                    <button type="submit" disabled={disabled}>Submit</button>
                </form>
                </div>
                }
                
            </div>
            <h3>Members:</h3>
            <ul>
                {
                    membershipList?.map(val => {
                        return (
                            <li key={val.id}><b>Name:</b> {val.publicUserData.identifier} <b>Role: {val.role}</b></li>
                        )
                    })
                }
            </ul>
        </div>
    );
}
