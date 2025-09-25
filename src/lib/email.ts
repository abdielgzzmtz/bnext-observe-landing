"use server"
import { headers } from "next/headers";
import z from "zod";

const schema = z.object({
    name: z.string().min(1, { message: "El nombre es requerido" }).max(100, { message: "El nombre es muy largo" }),
    company: z.string().min(1, { message: "El nombre de la empresa es requerida" }).max(100, { message: "El nombre de la empresa es muy largo" }),
    phone: z.string().min(10, { message: "El teléfono es requerido" }).max(15, { message: "El teléfono es muy largo" }),
    email: z.string().min(5, { message: "El email es requerido" }).max(320, { message: "El email es muy largo" }).email({ message: "El email no es válido" }),
    msg: z.string().max(1000, { message: "El comentario es muy largo" }).optional(),
});

export type SendEmailState = {
  ok: boolean;
  error?: string;                 // error "global" (toast)
  fieldErrors?: Record<string, string[]>; // errores por campo (opcional)
  values?: { name?: string; company?: string; phone?: string; email?: string; msg?: string };
};

export async function sendEmail(prev: SendEmailState, formData: FormData) {

    const values = {
        name: formData.get("name")?.toString() || "",
        company: formData.get("company")?.toString() || "",
        phone: formData.get("phone")?.toString() || "",
        email: formData.get("email")?.toString() || "",
        msg: formData.get("msg")?.toString() || "",
    }


    const parsed = schema.safeParse(values);

    if (!parsed.success) {
        console.log(parsed.data)
        const flat = parsed.error.flatten();
        return {
            ok: false,
            error: "Revisa los campos marcados.",
            fieldErrors: flat.fieldErrors,
            values
        };
    }

    try {
        const envBase =
            process.env.SITE_URL ||
            (process.env.VERCEL_URL ? `${process.env.VERCEL_URL}` : undefined) ||
            (process.env.SITE_URL ? `${process.env.SITE_URL}` : undefined) ||
            (process.env.URL ? `${process.env.URL}` : undefined);

        const h = await headers();
        const host = h.get("x-forwarded-host") ?? h.get("host");
        const proto = h.get("x-forwarded-proto") ?? "http";
        const runtimeBase = host ? `${proto}://${host}` : undefined;

        const base = envBase ?? runtimeBase ?? "https://localhost:3000";

        await fetch(`${base}/api/send`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: formData.get("name"),
                company: formData.get("company"),
                phone: formData.get("phone"),
                email: formData.get("email"),
                msg: formData.get("msg"),
            }),
        });

        return { ok: true };
    } catch (error) {
        console.error(error);
        return { ok: false, error: "Hubo un error enviando el mensaje. Intenta de nuevo.", values };
    }
}