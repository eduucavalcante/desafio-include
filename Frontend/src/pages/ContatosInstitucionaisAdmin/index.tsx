
import React from "react";
import AdminNavbar from "../../components/NavBarAdmin";
import ContatosInforAdmin from "../../components/ContatosInforAdmin";

function ContatosInstituAdmin(){
    return(
        <div>
             <AdminNavbar/>
            <div className="p-6 pt-24 lg:pt-6">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard Administrativo</h1>
                    </div>

                    <ContatosInforAdmin/>
                </div>
            </div>

        </div>
    )
}
export default ContatosInstituAdmin;