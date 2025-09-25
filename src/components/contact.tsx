"use client";

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { sendEmail, SendEmailState } from '@/lib/email'
import { useFormStatus } from 'react-dom';
import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from 'sonner';

const initialState: SendEmailState = { ok: false, values: { name:"", company:"", phone:"", email:"", msg:"" } };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Enviando..." : "Enviar"}
    </Button>
  );
}

export default function ContactSection() {
    const [state, formAction] = useActionState(sendEmail, initialState);
    // 1) Referencia al formulario para resetearlo SOLO cuando ok = true
    const formRef = useRef<HTMLFormElement>(null);

    // 2) (Opcional) Si quieres “hard reset” garantizado, usa una key para remonte
    const [formKey, setFormKey] = useState("form-1");

    useEffect(() => {
        if (state.ok) {
            toast.success("¡Mensaje enviado!");
            // reset “suave”: limpia valores nativos del form (uncontrolled)
            formRef.current?.reset(); // recomendado para inputs no controlados :contentReference[oaicite:1]{index=1}
            // o reset “duro”: remonta el formulario para borrar cualquier estado interno
            setFormKey((k) => k + "-r"); // cambiar la key fuerza remount del subárbol :contentReference[oaicite:2]{index=2}
        } else if (state.error) {
            toast.error(state.error);
        }
    }, [state.ok, state.error]);

    const v = state.values ?? initialState.values!;

    return (
        <section id="contactanos" className="py-32">
            <div className="mx-auto max-w-3xl px-8 lg:px-0">
                <h1 className="text-center text-4xl font-semibold lg:text-5xl">Contáctanos</h1>
                <p className="mt-4 text-center">Te ayudaremos a encontrar el plan y precio adecuado para tu negocio.</p>

                <Card className="mx-auto mt-12 max-w-lg p-8 shadow-md sm:p-16">
                    <div>
                        <h2 className="text-xl font-semibold">Vamos a llevarte al lugar correcto</h2>
                        <p className="mt-4 text-sm">¡Ponte en contacto con nuestro equipo de ventas! Estamos ansiosos por saber más sobre cómo planeas usar nuestra aplicación.</p>
                    </div>

                    <form
                        key={formKey} // 2) key para remonte
                        ref={formRef} // 1) referencia al form
                        action={formAction}
                        className="**:[&>label]:block mt-12 space-y-6 *:space-y-3">
                        <div>
                            <Label htmlFor="name">Nombre</Label>
                            <Input
                                type="text"
                                id="name"
                                name="name"
                                required
                                defaultValue={v.name}
                            />
                            {state.fieldErrors?.name && (
                                <p className="text-sm text-red-600">{state.fieldErrors.name[0]}</p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="email">Empresa</Label>
                            <Input
                                type="text"
                                id="company"
                                name="company"
                                required
                                defaultValue={v.company}
                            />
                            {state.fieldErrors?.company && (
                                <p className="text-sm text-red-600">{state.fieldErrors.company[0]}</p>
                            )}
                        </div>
                        

                        <div>
                            <Label htmlFor="phone">Teléfono</Label>
                            <Input
                                type="text"
                                id="phone"
                                name="phone"
                                required
                                defaultValue={v.phone}
                            />
                            {state.fieldErrors?.phone && (
                                <p className="text-sm text-red-600">{state.fieldErrors.phone[0]}</p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="email">Correo electrónico</Label>
                            <Input
                                type="email"
                                id="email"
                                name="email"
                                required
                                defaultValue={v.email}
                            />
                            {state.fieldErrors?.email && (
                                <p className="text-sm text-red-600">{state.fieldErrors.email[0]}</p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="msg">Comentario</Label>
                            <Textarea
                                id="msg"
                                name="msg"
                                placeholder="Escribe tu mensaje aquí..."
                                rows={3}
                                defaultValue={v.msg}
                            />
                            {state.fieldErrors?.msg && (
                                <p className="text-sm text-red-600">{state.fieldErrors.msg[0]}</p>
                            )}
                        </div>

                        <SubmitButton />
                    </form>
                </Card>
            </div>
        </section>
    )
}
