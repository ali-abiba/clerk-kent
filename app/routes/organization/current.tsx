import { useLoaderData } from "@remix-run/react";
import { LoaderArgs ,json } from "@remix-run/node";
import { useOrganization, useOrganizationList } from "@clerk/remix";
import { useState } from "react";

export const loader = async (params: LoaderArgs) => {
    return json({organizationId: params.params.organization});
}

export default function Current() {
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
    
    return (
        <div>
            <h2>{organization.name}</h2>
            <span>Your role: {membership.role}</span>
            <br />
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
