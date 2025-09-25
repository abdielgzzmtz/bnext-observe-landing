import { cn } from '@/lib/utils'
import Image from 'next/image'

import logoFullPng from '../../public/bnext.png';

export function Logo({ className } : { className?: string }) {
    return (
        <Image
            src={logoFullPng}
            alt="Logo"
            className={cn('h-8 w-26 invert grayscale dark:invert-0 dark:grayscale-0', className)}
        />
    )
}