import { NextResponse } from 'next/server';
import { verify } from 'supabase';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const otp = searchParams.get('otp');

    if (type === 'signup' && otp) {
        // Verify OTP
        const { data, error } = await verify(otp);

        if (error) {
            return NextResponse.redirect('/error?message=Unable to verify OTP');
        }

        // Handle successful verification
        return NextResponse.redirect('/success');
    }

    return NextResponse.redirect('/error?message=Invalid request');
}