"use client";

import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Ticket, Map } from "lucide-react";
import "./StaggeredMenu.css";

export interface StaggeredMenuItem {
    label: string;
    ariaLabel: string;
    href: string;
}

export interface StaggeredMenuSocialItem {
    label: string;
    link: string;
}

export interface StaggeredMenuProps {
    position?: "left" | "right";
    colors?: string[];
    items?: StaggeredMenuItem[];
    socialItems?: StaggeredMenuSocialItem[];
    displaySocials?: boolean;
    displayItemNumbering?: boolean;
    accentColor?: string;
    closeOnClickAway?: boolean;
    onMenuOpen?: () => void;
    onMenuClose?: () => void;
}

/**
 * Headless StaggeredMenu — only the panel + overlay, NO toggle button.
 * The toggle button is handled by the Navbar directly via the `open` prop and `onToggle` callback.
 */
export interface StaggeredMenuPanelProps extends StaggeredMenuProps {
    open: boolean;
    onClose: () => void;
}

export const StaggeredMenuPanel: React.FC<StaggeredMenuPanelProps> = ({
    position = "left",
    colors = ["#1a1000", "#2a1f00"],
    items = [],
    socialItems = [],
    displaySocials = true,
    displayItemNumbering = false,
    accentColor = "#f5c500",
    closeOnClickAway = true,
    onMenuOpen,
    onMenuClose,
    open,
    onClose,
}) => {
    const pathname = usePathname();
    const openRef = useRef(false);

    const panelRef = useRef<HTMLDivElement | null>(null);
    const preLayersRef = useRef<HTMLDivElement | null>(null);
    const preLayerElsRef = useRef<HTMLElement[]>([]);

    const openTlRef = useRef<gsap.core.Timeline | null>(null);
    const closeTweenRef = useRef<gsap.core.Tween | null>(null);
    const busyRef = useRef(false);
    const itemEntranceTweenRef = useRef<gsap.core.Tween | null>(null);

    // Sync external `open` prop with internal animation state
    const prevOpenRef = useRef(false);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const panel = panelRef.current;
            const preContainer = preLayersRef.current;
            if (!panel) return;

            let preLayers: HTMLElement[] = [];
            if (preContainer) {
                preLayers = Array.from(
                    preContainer.querySelectorAll(".sm-prelayer")
                ) as HTMLElement[];
            }
            preLayerElsRef.current = preLayers;

            const offscreen = position === "left" ? -100 : 100;
            gsap.set([panel, ...preLayers], { xPercent: offscreen });
        });
        return () => ctx.revert();
    }, [position]);

    const buildOpenTimeline = useCallback(() => {
        const panel = panelRef.current;
        const layers = preLayerElsRef.current;
        if (!panel) return null;

        openTlRef.current?.kill();
        if (closeTweenRef.current) {
            closeTweenRef.current.kill();
            closeTweenRef.current = null;
        }
        itemEntranceTweenRef.current?.kill();

        const itemEls = Array.from(
            panel.querySelectorAll(".sm-panel-itemLabel")
        ) as HTMLElement[];
        const numberEls = Array.from(
            panel.querySelectorAll(".sm-panel-list[data-numbering] .sm-panel-item")
        ) as HTMLElement[];
        const socialTitle = panel.querySelector(".sm-socials-title") as HTMLElement | null;
        const socialLinks = Array.from(
            panel.querySelectorAll(".sm-socials-link")
        ) as HTMLElement[];

        const layerStates = layers.map((el) => ({
            el,
            start: Number(gsap.getProperty(el, "xPercent")),
        }));
        const panelStart = Number(gsap.getProperty(panel, "xPercent"));

        if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });
        if (numberEls.length) gsap.set(numberEls, { "--sm-num-opacity": 0 });
        if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
        if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });

        const tl = gsap.timeline({ paused: true });

        layerStates.forEach((ls, i) => {
            tl.fromTo(
                ls.el,
                { xPercent: ls.start },
                { xPercent: 0, duration: 0.5, ease: "power4.out" },
                i * 0.07
            );
        });
        const lastTime = layerStates.length ? (layerStates.length - 1) * 0.07 : 0;
        const panelInsertTime = lastTime + (layerStates.length ? 0.08 : 0);
        const panelDuration = 0.65;
        tl.fromTo(
            panel,
            { xPercent: panelStart },
            { xPercent: 0, duration: panelDuration, ease: "power4.out" },
            panelInsertTime
        );

        if (itemEls.length) {
            const itemsStart = panelInsertTime + panelDuration * 0.15;
            tl.to(
                itemEls,
                { yPercent: 0, rotate: 0, duration: 1, ease: "power4.out", stagger: { each: 0.1 } },
                itemsStart
            );
            if (numberEls.length) {
                tl.to(
                    numberEls,
                    { duration: 0.6, ease: "power2.out", "--sm-num-opacity": 1, stagger: { each: 0.08 } },
                    itemsStart + 0.1
                );
            }
        }

        if (socialTitle || socialLinks.length) {
            const socialsStart = panelInsertTime + panelDuration * 0.4;
            if (socialTitle) tl.to(socialTitle, { opacity: 1, duration: 0.5, ease: "power2.out" }, socialsStart);
            if (socialLinks.length) {
                tl.to(
                    socialLinks,
                    {
                        y: 0, opacity: 1, duration: 0.55, ease: "power3.out",
                        stagger: { each: 0.08 },
                        onComplete: () => { gsap.set(socialLinks, { clearProps: "opacity" }); },
                    },
                    socialsStart + 0.04
                );
            }
        }

        openTlRef.current = tl;
        return tl;
    }, [position]);

    const playOpen = useCallback(() => {
        if (busyRef.current) return;
        busyRef.current = true;
        const tl = buildOpenTimeline();
        if (tl) {
            tl.eventCallback("onComplete", () => { busyRef.current = false; });
            tl.play(0);
        } else {
            busyRef.current = false;
        }
    }, [buildOpenTimeline]);

    const playClose = useCallback(() => {
        openTlRef.current?.kill();
        openTlRef.current = null;
        itemEntranceTweenRef.current?.kill();

        const panel = panelRef.current;
        const layers = preLayerElsRef.current;
        if (!panel) return;

        closeTweenRef.current?.kill();
        const offscreen = position === "left" ? -100 : 100;
        closeTweenRef.current = gsap.to([...layers, panel], {
            xPercent: offscreen,
            duration: 0.32,
            ease: "power3.in",
            overwrite: "auto",
            onComplete: () => {
                const itemEls = Array.from(panel.querySelectorAll(".sm-panel-itemLabel")) as HTMLElement[];
                if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });
                const numberEls = Array.from(panel.querySelectorAll(".sm-panel-list[data-numbering] .sm-panel-item")) as HTMLElement[];
                if (numberEls.length) gsap.set(numberEls, { "--sm-num-opacity": 0 });
                const socialTitle = panel.querySelector(".sm-socials-title") as HTMLElement | null;
                const socialLinks = Array.from(panel.querySelectorAll(".sm-socials-link")) as HTMLElement[];
                if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
                if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });
                busyRef.current = false;
            },
        });
    }, [position]);

    // React to external open prop changes
    React.useEffect(() => {
        if (open === prevOpenRef.current) return;
        prevOpenRef.current = open;
        openRef.current = open;
        if (open) {
            onMenuOpen?.();
            playOpen();
        } else {
            onMenuClose?.();
            playClose();
        }
    }, [open, playOpen, playClose, onMenuOpen, onMenuClose]);

    // Close on route change
    React.useEffect(() => {
        if (openRef.current) {
            onClose();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    // Click away
    React.useEffect(() => {
        if (!closeOnClickAway || !open) return;
        const handleClickOutside = (event: MouseEvent) => {
            if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
                onClose();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [closeOnClickAway, open, onClose]);

    return (
        <div
            className="staggered-menu-wrapper fixed-wrapper"
            style={accentColor ? ({ ["--sm-accent" as any]: accentColor } as React.CSSProperties) : undefined}
            data-position={position}
            data-open={open || undefined}
        >
            {/* Pre-layers */}
            <div ref={preLayersRef} className="sm-prelayers" aria-hidden="true">
                {(() => {
                    const raw = colors && colors.length ? colors.slice(0, 4) : ["#1a1000", "#2a1f00"];
                    let arr = [...raw];
                    if (arr.length >= 3) {
                        const mid = Math.floor(arr.length / 2);
                        arr.splice(mid, 1);
                    }
                    return arr.map((c, i) => (
                        <div key={i} className="sm-prelayer" style={{ background: c }} />
                    ));
                })()}
            </div>

            {/* Sidebar panel */}
            <aside
                id="staggered-menu-panel"
                ref={panelRef}
                className="staggered-menu-panel"
                aria-hidden={!open}
                aria-label="Navegación principal"
            >
                <div className="sm-panel-inner">
                    <p className="sm-panel-title">
                        COMIC<span style={{ color: "var(--sm-accent, #f5c500)" }}>FEST</span>
                    </p>

                    <ul className="sm-panel-list" role="list" data-numbering={displayItemNumbering || undefined}>
                        {items && items.length ? (
                            items.map((it, idx) => (
                                <li className="sm-panel-itemWrap" key={it.href + idx}>
                                    <Link
                                        className={`sm-panel-item${pathname === it.href ? " active-link" : ""}`}
                                        href={it.href}
                                        aria-label={it.ariaLabel}
                                        data-index={idx + 1}
                                        onClick={onClose}
                                    >
                                        <span className="sm-panel-itemLabel">{it.label}</span>
                                    </Link>
                                </li>
                            ))
                        ) : (
                            <li className="sm-panel-itemWrap" aria-hidden="true">
                                <span className="sm-panel-item">
                                    <span className="sm-panel-itemLabel">Sin items</span>
                                </span>
                            </li>
                        )}
                    </ul>

                    <div className="sm-cta-wrap">
                        <Link href="/entradas" className="sm-cta-btn primary" onClick={onClose}>
                            <Ticket size={15} />
                            Comprar Entradas
                        </Link>
                        <Link href="/expositores/reserva" className="sm-cta-btn secondary" onClick={onClose}>
                            <Map size={15} />
                            Reservar Stand
                        </Link>
                    </div>
                </div>

                {displaySocials && socialItems && socialItems.length > 0 && (
                    <div className="sm-socials" aria-label="Redes sociales">
                        <h3 className="sm-socials-title">Síguenos</h3>
                        <ul className="sm-socials-list" role="list">
                            {socialItems.map((s, i) => (
                                <li key={s.label + i} className="sm-socials-item">
                                    <a href={s.link} target="_blank" rel="noopener noreferrer" className="sm-socials-link">
                                        {s.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </aside>
        </div>
    );
};

export default StaggeredMenuPanel;
