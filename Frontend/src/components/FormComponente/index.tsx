import { Button, Checkbox, Label, TextInput, Select, Textarea } from "flowbite-react";

import "./Style.css"

function FormComponent() {
    return (
        <form className="form-container w-full max-w-md flex flex-col gap-4">
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="name" className="labelForm">Nome Completo:</Label>
                </div>
                <TextInput id="nomeUser"className="inputForm"  placeholder="Seu nome" required />
            </div>

            <div>
                <div className="mb-2 block">
                    <Label htmlFor="telefone" className="labelForm" >Telefone (WhatsApp): </Label>
                </div>
                <TextInput id="telefone" className="inputForm" placeholder="(00) 00000-0000" required />
            </div>

            <div>
                <div className="mb-2 block">
                    <Label htmlFor="cidade" className="labelForm">Cidade/Localização: </Label>
                </div>
                <TextInput id="cidade" className="inputForm" placeholder="Sua cidade" required />
            </div>

            <div>
                <div className="mb-2 block">
                    <Label htmlFor="motivoContato" className="labelForm">Motivo do contato: </Label>
                </div>
                <TextInput id="motivoContato" className="inputForm" placeholder="Ex: Construção residencial" required />
            </div>

            <div>
                <div className="mb-2 block">
                    <Label htmlFor="motivoContato" className="labelForm">Tipo de projeto desejado: </Label>
                </div>
                <Select id="servicoUser" className="inputForm" required>
                    <option>Exemplo1</option>
                    <option>Exemplo2</option>
                    <option>Exemplo3</option>
                    <option>Exemplo14</option>
                </Select>
            </div>

            <div>
                <div className="mb-2 block">
                    <Label htmlFor="motivoContato" className="labelForm">Dúvidas ou informações adicionais: </Label>
                </div>
                <Textarea id="motivoContato" className="textareaForm" placeholder="Conte-nos mais sobre seu projeto..." required rows={4} />
            </div>

            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                Enviar Solicitação
            </Button>

            <div className="textFinalForm">
                <p>
                    Seus dados estão protegidos. Não compartilhamos informações pessoais.
                </p>
            </div>

        </form>
    )
}

export default FormComponent;