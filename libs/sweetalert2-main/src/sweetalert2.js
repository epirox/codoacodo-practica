	! function(e, t) {
	    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = e || self).Sweetalert2 = t()
	}(this, function() {
	    "use strict";
	    var p = {
	        awaitingPromise: new WeakMap,
	        promise: new WeakMap,
	        innerParams: new WeakMap,
	        domCache: new WeakMap
	    };
	    var e = e => {
	        const t = {};
	        for (const n in e) t[e[n]] = "swal2-" + e[n];
	        return t
	    };
	    const m = e(["container", "shown", "height-auto", "iosfix", "popup", "modal", "no-backdrop", "no-transition", "toast", "toast-shown", "show", "hide", "close", "title", "html-container", "actions", "confirm", "deny", "cancel", "default-outline", "footer", "icon", "icon-content", "image", "input", "file", "range", "select", "radio", "checkbox", "label", "textarea", "inputerror", "input-label", "validation-message", "progress-steps", "active-progress-step", "progress-step", "progress-step-line", "loader", "loading", "styled", "top", "top-start", "top-end", "top-left", "top-right", "center", "center-start", "center-end", "center-left", "center-right", "bottom", "bottom-start", "bottom-end", "bottom-left", "bottom-right", "grow-row", "grow-column", "grow-fullscreen", "rtl", "timer-progress-bar", "timer-progress-bar-container", "scrollbar-measure", "icon-success", "icon-warning", "icon-info", "icon-question", "icon-error", "no-war"]),
	        o = e(["success", "warning", "info", "question", "error"]),
	        D = "SweetAlert2:",
	        q = e => e.charAt(0).toUpperCase() + e.slice(1),
	        r = e => {
	            console.warn("".concat(D, " ").concat("object" == typeof e ? e.join(" ") : e))
	        },
	        l = e => {
	            console.error("".concat(D, " ").concat(e))
	        },
	        V = [],
	        N = (e, t) => {
	            e = '"'.concat(e, '" is deprecated and will be removed in the next major release. Please use "').concat(t, '" instead.'), V.includes(e) || (V.push(e), r(e))
	        },
	        R = e => "function" == typeof e ? e() : e,
	        F = e => e && "function" == typeof e.toPromise,
	        u = e => F(e) ? e.toPromise() : Promise.resolve(e),
	        U = e => e && Promise.resolve(e) === e;
	    const g = () => document.body.querySelector(".".concat(m.container)),
	        t = e => {
	            const t = g();
	            return t ? t.querySelector(e) : null
	        },
	        n = e => t(".".concat(e)),
	        h = () => n(m.popup),
	        W = () => n(m.icon),
	        z = () => n(m.title),
	        K = () => n(m["html-container"]),
	        _ = () => n(m.image),
	        Y = () => n(m["progress-steps"]),
	        Z = () => n(m["validation-message"]),
	        f = () => t(".".concat(m.actions, " .").concat(m.confirm)),
	        b = () => t(".".concat(m.actions, " .").concat(m.deny));
	    const d = () => t(".".concat(m.loader)),
	        y = () => t(".".concat(m.actions, " .").concat(m.cancel)),
	        X = () => n(m.actions),
	        $ = () => n(m.footer),
	        J = () => n(m["timer-progress-bar"]),
	        G = () => n(m.close),
	        Q = () => {
	            const e = Array.from(h().querySelectorAll('[tabindex]:not([tabindex="-1"]):not([tabindex="0"])')).sort((e, t) => {
	                e = parseInt(e.getAttribute("tabindex")), t = parseInt(t.getAttribute("tabindex"));
	                return t < e ? 1 : e < t ? -1 : 0
	            });
	            var t = Array.from(h().querySelectorAll('\n  a[href],\n  area[href],\n  input:not([disabled]),\n  select:not([disabled]),\n  textarea:not([disabled]),\n  button:not([disabled]),\n  iframe,\n  object,\n  embed,\n  [tabindex="0"],\n  [contenteditable],\n  audio[controls],\n  video[controls],\n  summary\n')).filter(e => "-1" !== e.getAttribute("tabindex"));
	            return (t => {
	                const n = [];
	                for (let e = 0; e < t.length; e++) - 1 === n.indexOf(t[e]) && n.push(t[e]);
	                return n
	            })(e.concat(t)).filter(e => x(e))
	        },
	        ee = () => s(document.body, m.shown) && !s(document.body, m["toast-shown"]) && !s(document.body, m["no-backdrop"]),
	        te = () => h() && s(h(), m.toast);

	    function ne(e) {
	        var t = 1 < arguments.length && void 0 !== arguments[1] && arguments[1];
	        const n = J();
	        x(n) && (t && (n.style.transition = "none", n.style.width = "100%"), setTimeout(() => {
	            n.style.transition = "width ".concat(e / 1e3, "s linear"), n.style.width = "0%"
	        }, 10))
	    }
	    const i = {
	            previousBodyPadding: null
	        },
	        v = (t, e) => {
	            if (t.textContent = "", e) {
	                const n = new DOMParser,
	                    o = n.parseFromString(e, "text/html");
	                Array.from(o.querySelector("head").childNodes).forEach(e => {
	                    t.appendChild(e)
	                }), Array.from(o.querySelector("body").childNodes).forEach(e => {
	                    t.appendChild(e)
	                })
	            }
	        },
	        s = (t, e) => {
	            if (!e) return !1;
	            var n = e.split(/\s+/);
	            for (let e = 0; e < n.length; e++)
	                if (!t.classList.contains(n[e])) return !1;
	            return !0
	        },
	        oe = (t, n) => {
	            Array.from(t.classList).forEach(e => {
	                Object.values(m).includes(e) || Object.values(o).includes(e) || Object.values(n.showClass).includes(e) || t.classList.remove(e)
	            })
	        },
	        w = (e, t, n) => {
	            if (oe(e, t), t.customClass && t.customClass[n]) {
	                if ("string" != typeof t.customClass[n] && !t.customClass[n].forEach) return r("Invalid type of customClass.".concat(n, '! Expected string or iterable object, got "').concat(typeof t.customClass[n], '"'));
	                C(e, t.customClass[n])
	            }
	        },
	        ie = (e, t) => {
	            if (!t) return null;
	            switch (t) {
	                case "select":
	                case "textarea":
	                case "file":
	                    return e.querySelector(".".concat(m.popup, " > .").concat(m[t]));
	                case "checkbox":
	                    return e.querySelector(".".concat(m.popup, " > .").concat(m.checkbox, " input"));
	                case "radio":
	                    return e.querySelector(".".concat(m.popup, " > .").concat(m.radio, " input:checked")) || e.querySelector(".".concat(m.popup, " > .").concat(m.radio, " input:first-child"));
	                case "range":
	                    return e.querySelector(".".concat(m.popup, " > .").concat(m.range, " input"));
	                default:
	                    return e.querySelector(".".concat(m.popup, " > .").concat(m.input))
	            }
	        },
	        re = e => {
	            var t;
	            e.focus(), "file" !== e.type && (t = e.value, e.value = "", e.value = t)
	        },
	        ae = (e, t, n) => {
	            e && t && (t = "string" == typeof t ? t.split(/\s+/).filter(Boolean) : t).forEach(t => {
	                Array.isArray(e) ? e.forEach(e => {
	                    n ? e.classList.add(t) : e.classList.remove(t)
	                }) : n ? e.classList.add(t) : e.classList.remove(t)
	            })
	        },
	        C = (e, t) => {
	            ae(e, t, !0)
	        },
	        A = (e, t) => {
	            ae(e, t, !1)
	        },
	        k = (e, t) => {
	            var n = Array.from(e.children);
	            for (let e = 0; e < n.length; e++) {
	                var o = n[e];
	                if (o instanceof HTMLElement && s(o, t)) return o
	            }
	        },
	        a = (e, t, n) => {
	            (n = n === "".concat(parseInt(n)) ? parseInt(n) : n) || 0 === parseInt(n) ? e.style[t] = "number" == typeof n ? "".concat(n, "px") : n : e.style.removeProperty(t)
	        },
	        B = function(e) {
	            e.style.display = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "flex"
	        },
	        P = e => {
	            e.style.display = "none"
	        },
	        se = (e, t, n, o) => {
	            const i = e.querySelector(t);
	            i && (i.style[n] = o)
	        },
	        ce = function(e, t) {
	            var n = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : "flex";
	            t ? B(e, n) : P(e)
	        },
	        x = e => !(!e || !(e.offsetWidth || e.offsetHeight || e.getClientRects().length)),
	        le = () => !x(f()) && !x(b()) && !x(y()),
	        ue = e => !!(e.scrollHeight > e.clientHeight),
	        de = e => {
	            const t = window.getComputedStyle(e);
	            var e = parseFloat(t.getPropertyValue("animation-duration") || "0"),
	                n = parseFloat(t.getPropertyValue("transition-duration") || "0");
	            return 0 < e || 0 < n
	        },
	        pe = 100,
	        E = {},
	        me = () => {
	            E.previousActiveElement instanceof HTMLElement ? (E.previousActiveElement.focus(), E.previousActiveElement = null) : document.body && document.body.focus()
	        },
	        ge = o => new Promise(e => {
	            if (!o) return e();
	            var t = window.scrollX,
	                n = window.scrollY;
	            E.restoreFocusTimeout = setTimeout(() => {
	                me(), e()
	            }, pe), window.scrollTo(t, n)
	        }),
	        he = () => "undefined" == typeof window || "undefined" == typeof document,
	        fe = '\n <div aria-labelledby="'.concat(m.title, '" aria-describedby="').concat(m["html-container"], '" class="').concat(m.popup, '" tabindex="-1">\n   <button type="button" class="').concat(m.close, '"></button>\n   <ul class="').concat(m["progress-steps"], '"></ul>\n   <div class="').concat(m.icon, '"></div>\n   <img class="').concat(m.image, '" />\n   <h2 class="').concat(m.title, '" id="').concat(m.title, '"></h2>\n   <div class="').concat(m["html-container"], '" id="').concat(m["html-container"], '"></div>\n   <input class="').concat(m.input, '" />\n   <input type="file" class="').concat(m.file, '" />\n   <div class="').concat(m.range, '">\n     <input type="range" />\n     <output></output>\n   </div>\n   <select class="').concat(m.select, '"></select>\n   <div class="').concat(m.radio, '"></div>\n   <label for="').concat(m.checkbox, '" class="').concat(m.checkbox, '">\n     <input type="checkbox" />\n     <span class="').concat(m.label, '"></span>\n   </label>\n   <textarea class="').concat(m.textarea, '"></textarea>\n   <div class="').concat(m["validation-message"], '" id="').concat(m["validation-message"], '"></div>\n   <div class="').concat(m.actions, '">\n     <div class="').concat(m.loader, '"></div>\n     <button type="button" class="').concat(m.confirm, '"></button>\n     <button type="button" class="').concat(m.deny, '"></button>\n     <button type="button" class="').concat(m.cancel, '"></button>\n   </div>\n   <div class="').concat(m.footer, '"></div>\n   <div class="').concat(m["timer-progress-bar-container"], '">\n     <div class="').concat(m["timer-progress-bar"], '"></div>\n   </div>\n </div>\n').replace(/(^|\n)\s*/g, ""),
	        be = () => {
	            const e = g();
	            return !!e && (e.remove(), A([document.documentElement, document.body], [m["no-backdrop"], m["toast-shown"], m["has-column"]]), !0)
	        },
	        c = () => {
	            E.currentInstance.resetValidationMessage()
	        },
	        ye = () => {
	            const e = h(),
	                t = k(e, m.input),
	                n = k(e, m.file),
	                o = e.querySelector(".".concat(m.range, " input")),
	                i = e.querySelector(".".concat(m.range, " output")),
	                r = k(e, m.select),
	                a = e.querySelector(".".concat(m.checkbox, " input")),
	                s = k(e, m.textarea);
	            t.oninput = c, n.onchange = c, r.onchange = c, a.onchange = c, s.oninput = c, o.oninput = () => {
	                c(), i.value = o.value
	            }, o.onchange = () => {
	                c(), i.value = o.value
	            }
	        },
	        ve = e => "string" == typeof e ? document.querySelector(e) : e,
	        we = e => {
	            const t = h();
	            t.setAttribute("role", e.toast ? "alert" : "dialog"), t.setAttribute("aria-live", e.toast ? "polite" : "assertive"), e.toast || t.setAttribute("aria-modal", "true")
	        },
	        Ce = e => {
	            "rtl" === window.getComputedStyle(e).direction && C(g(), m.rtl)
	        },
	        Ae = (e, t) => {
	            if (e instanceof HTMLElement) t.appendChild(e);
	            else if ("object" == typeof e) {
	                var n = e,
	                    o = t;
	                if (n.jquery) ke(o, n);
	                else v(o, n.toString())
	            } else e && v(t, e)
	        },
	        ke = (t, n) => {
	            if (t.textContent = "", 0 in n)
	                for (let e = 0; e in n; e++) t.appendChild(n[e].cloneNode(!0));
	            else t.appendChild(n.cloneNode(!0))
	        },
	        Be = (() => {
	            if (!he()) {
	                var e = document.createElement("div"),
	                    t = {
	                        WebkitAnimation: "webkitAnimationEnd",
	                        animation: "animationend"
	                    };
	                for (const n in t)
	                    if (Object.prototype.hasOwnProperty.call(t, n) && void 0 !== e.style[n]) return t[n]
	            }
	            return !1
	        })(),
	        Pe = (e, t) => {
	            var n, o, i, r, a, s = X(),
	                c = d();
	            (t.showConfirmButton || t.showDenyButton || t.showCancelButton ? B : P)(s), w(s, t, "actions"), s = s, n = c, o = t, i = f(), r = b(), a = y(), xe(i, "confirm", o), xe(r, "deny", o), xe(a, "cancel", o),
	                function(e, t, n, o) {
	                    if (!o.buttonsStyling) return A([e, t, n], m.styled);
	                    C([e, t, n], m.styled), o.confirmButtonColor && (e.style.backgroundColor = o.confirmButtonColor, C(e, m["default-outline"]));
	                    o.denyButtonColor && (t.style.backgroundColor = o.denyButtonColor, C(t, m["default-outline"]));
	                    o.cancelButtonColor && (n.style.backgroundColor = o.cancelButtonColor, C(n, m["default-outline"]))
	                }(i, r, a, o), o.reverseButtons && (o.toast ? (s.insertBefore(a, i), s.insertBefore(r, i)) : (s.insertBefore(a, n), s.insertBefore(r, n), s.insertBefore(i, n))), v(c, t.loaderHtml), w(c, t, "loader")
	        };

	    function xe(e, t, n) {
	        ce(e, n["show".concat(q(t), "Button")], "inline-block"), v(e, n["".concat(t, "ButtonText")]), e.setAttribute("aria-label", n["".concat(t, "ButtonAriaLabel")]), e.className = m[t], w(e, n, "".concat(t, "Button")), C(e, n["".concat(t, "ButtonClass")])
	    }
	    const Ee = (e, t) => {
	            const n = G();
	            v(n, t.closeButtonHtml), w(n, t, "closeButton"), ce(n, t.showCloseButton), n.setAttribute("aria-label", t.closeButtonAriaLabel)
	        },
	        Te = (e, t) => {
	            var n, o, i = g();
	            i && (o = i, "string" == typeof(n = t.backdrop) ? o.style.background = n : n || C([document.documentElement, document.body], m["no-backdrop"]), o = i, (n = t.position) in m ? C(o, m[n]) : (r('The "position" parameter is not valid, defaulting to "center"'), C(o, m.center)), n = i, (o = t.grow) && "string" == typeof o && (o = "grow-".concat(o)) in m && C(n, m[o]), w(i, t, "container"))
	        };
	    const Le = ["input", "file", "range", "select", "radio", "checkbox", "textarea"],
	        Se = (e, a) => {
	            const s = h();
	            var t, e = p.innerParams.get(e);
	            const c = !e || a.input !== e.input;
	            Le.forEach(e => {
	                const t = k(s, m[e]); {
	                    var n = e,
	                        o = a.inputAttributes;
	                    const i = ie(h(), n);
	                    if (i) {
	                        Oe(i);
	                        for (const r in o) i.setAttribute(r, o[r])
	                    }
	                }
	                t.className = m[e], c && P(t)
	            }), a.input && (c && (e => {
	                if (!T[e.input]) return l('Unexpected type of input! Expected "text", "email", "password", "number", "tel", "select", "radio", "checkbox", "textarea", "file" or "url", got "'.concat(e.input, '"'));
	                const t = He(e.input),
	                    n = T[e.input](t, e);
	                B(t), setTimeout(() => {
	                    re(n)
	                })
	            })(a), e = a, t = He(e.input), "object" == typeof e.customClass && C(t, e.customClass.input))
	        },
	        Oe = t => {
	            for (let e = 0; e < t.attributes.length; e++) {
	                var n = t.attributes[e].name;
	                ["type", "value", "style"].includes(n) || t.removeAttribute(n)
	            }
	        },
	        Me = (e, t) => {
	            e.placeholder && !t.inputPlaceholder || (e.placeholder = t.inputPlaceholder)
	        },
	        je = (e, t, n) => {
	            if (n.inputLabel) {
	                e.id = m.input;
	                const i = document.createElement("label");
	                var o = m["input-label"];
	                i.setAttribute("for", e.id), i.className = o, "object" == typeof n.customClass && C(i, n.customClass.inputLabel), i.innerText = n.inputLabel, t.insertAdjacentElement("beforebegin", i)
	            }
	        },
	        He = e => k(h(), m[e] || m.input),
	        Ie = (e, t) => {
	            ["string", "number"].includes(typeof t) ? e.value = "".concat(t) : U(t) || r('Unexpected type of inputValue! Expected "string", "number" or "Promise", got "'.concat(typeof t, '"'))
	        },
	        T = {},
	        De = (T.text = T.email = T.password = T.number = T.tel = T.url = (e, t) => (Ie(e, t.inputValue), je(e, e, t), Me(e, t), e.type = t.input, e), T.file = (e, t) => (je(e, e, t), Me(e, t), e), T.range = (e, t) => {
	            const n = e.querySelector("input");
	            var o = e.querySelector("output");
	            return Ie(n, t.inputValue), n.type = t.input, Ie(o, t.inputValue), je(n, e, t), e
	        }, T.select = (e, t) => {
	            if (e.textContent = "", t.inputPlaceholder) {
	                const n = document.createElement("option");
	                v(n, t.inputPlaceholder), n.value = "", n.disabled = !0, n.selected = !0, e.appendChild(n)
	            }
	            return je(e, e, t), e
	        }, T.radio = e => (e.textContent = "", e), T.checkbox = (e, t) => {
	            const n = ie(h(), "checkbox");
	            n.value = "1", n.id = m.checkbox, n.checked = Boolean(t.inputValue);
	            e = e.querySelector("span");
	            return v(e, t.inputPlaceholder), n
	        }, T.textarea = (n, e) => {
	            Ie(n, e.inputValue), Me(n, e), je(n, n, e);
	            return setTimeout(() => {
	                if ("MutationObserver" in window) {
	                    const t = parseInt(window.getComputedStyle(h()).width);
	                    new MutationObserver(() => {
	                        var e = n.offsetWidth + (e = n, parseInt(window.getComputedStyle(e).marginLeft) + parseInt(window.getComputedStyle(e).marginRight));
	                        e > t ? h().style.width = "".concat(e, "px") : h().style.width = null
	                    }).observe(n, {
	                        attributes: !0,
	                        attributeFilter: ["style"]
	                    })
	                }
	            }), n
	        }, (e, t) => {
	            const n = K();
	            w(n, t, "htmlContainer"), t.html ? (Ae(t.html, n), B(n, "block")) : t.text ? (n.textContent = t.text, B(n, "block")) : P(n), Se(e, t)
	        }),
	        qe = (e, t) => {
	            var n = $();
	            ce(n, t.footer), t.footer && Ae(t.footer, n), w(n, t, "footer")
	        },
	        Ve = (e, t) => {
	            var e = p.innerParams.get(e),
	                n = W();
	            e && t.icon === e.icon ? (We(n, t), Ne(n, t)) : t.icon || t.iconHtml ? t.icon && -1 === Object.keys(o).indexOf(t.icon) ? (l('Unknown icon! Expected "success", "error", "warning", "info" or "question", got "'.concat(t.icon, '"')), P(n)) : (B(n), We(n, t), Ne(n, t), C(n, t.showClass.icon)) : P(n)
	        },
	        Ne = (e, t) => {
	            for (const n in o) t.icon !== n && A(e, o[n]);
	            C(e, o[t.icon]), ze(e, t), Re(), w(e, t, "icon")
	        },
	        Re = () => {
	            const e = h();
	            var t = window.getComputedStyle(e).getPropertyValue("background-color");
	            const n = e.querySelectorAll("[class^=swal2-success-circular-line], .swal2-success-fix");
	            for (let e = 0; e < n.length; e++) n[e].style.backgroundColor = t
	        },
	        Fe = '\n  <div class="swal2-success-circular-line-left"></div>\n  <span class="swal2-success-line-tip"></span> <span class="swal2-success-line-long"></span>\n  <div class="swal2-success-ring"></div> <div class="swal2-success-fix"></div>\n  <div class="swal2-success-circular-line-right"></div>\n',
	        Ue = '\n  <span class="swal2-x-mark">\n    <span class="swal2-x-mark-line-left"></span>\n    <span class="swal2-x-mark-line-right"></span>\n  </span>\n',
	        We = (e, t) => {
	            let n = e.innerHTML,
	                o;
	            var i;
	            t.iconHtml ? o = Ke(t.iconHtml) : "success" === t.icon ? (o = Fe, n = n.replace(/ style=".*?"/g, "")) : o = "error" === t.icon ? Ue : (i = {
	                question: "?",
	                warning: "!",
	                info: "i"
	            }, Ke(i[t.icon])), n.trim() !== o.trim() && v(e, o)
	        },
	        ze = (e, t) => {
	            if (t.iconColor) {
	                e.style.color = t.iconColor, e.style.borderColor = t.iconColor;
	                for (const n of [".swal2-success-line-tip", ".swal2-success-line-long", ".swal2-x-mark-line-left", ".swal2-x-mark-line-right"]) se(e, n, "backgroundColor", t.iconColor);
	                se(e, ".swal2-success-ring", "borderColor", t.iconColor)
	            }
	        },
	        Ke = e => '<div class="'.concat(m["icon-content"], '">').concat(e, "</div>"),
	        _e = (e, t) => {
	            const n = _();
	            if (!t.imageUrl) return P(n);
	            B(n, ""), n.setAttribute("src", t.imageUrl), n.setAttribute("alt", t.imageAlt), a(n, "width", t.imageWidth), a(n, "height", t.imageHeight), n.className = m.image, w(n, t, "image")
	        },
	        Ye = (e, t) => {
	            var n = g();
	            const o = h();
	            t.toast ? (a(n, "width", t.width), o.style.width = "100%", o.insertBefore(d(), W())) : a(o, "width", t.width), a(o, "padding", t.padding), t.color && (o.style.color = t.color), t.background && (o.style.background = t.background), P(Z());
	            n = o;
	            (n.className = "".concat(m.popup, " ").concat(x(n) ? t.showClass.popup : ""), t.toast) ? (C([document.documentElement, document.body], m["toast-shown"]), C(n, m.toast)) : C(n, m.modal);
	            w(n, t, "popup"), "string" == typeof t.customClass && C(n, t.customClass);
	            t.icon && C(n, m["icon-".concat(t.icon)])
	        },
	        Ze = (e, n) => {
	            const o = Y();
	            if (!n.progressSteps || 0 === n.progressSteps.length) return P(o);
	            B(o), o.textContent = "", n.currentProgressStep >= n.progressSteps.length && r("Invalid currentProgressStep parameter, it should be less than progressSteps.length (currentProgressStep like JS arrays starts from 0)"), n.progressSteps.forEach((e, t) => {
	                var e = (e => {
	                    const t = document.createElement("li");
	                    return C(t, m["progress-step"]), v(t, e), t
	                })(e);
	                o.appendChild(e), t === n.currentProgressStep && C(e, m["active-progress-step"]), t !== n.progressSteps.length - 1 && (e = (e => {
	                    const t = document.createElement("li");
	                    if (C(t, m["progress-step-line"]), e.progressStepsDistance) a(t, "width", e.progressStepsDistance);
	                    return t
	                })(n), o.appendChild(e))
	            })
	        },
	        Xe = (e, t) => {
	            const n = z();
	            ce(n, t.title || t.titleText, "block"), t.title && Ae(t.title, n), t.titleText && (n.innerText = t.titleText), w(n, t, "title")
	        },
	        $e = (e, t) => {
	            Ye(e, t), Te(e, t), Ze(e, t), Ve(e, t), _e(e, t), Xe(e, t), Ee(e, t), De(e, t), Pe(e, t), qe(e, t), "function" == typeof t.didRender && t.didRender(h())
	        };

	    function Je() {
	        var e, t = p.innerParams.get(this);
	        if (t) {
	            const n = p.domCache.get(this);
	            P(n.loader), te() ? t.icon && B(W()) : (t = n, (e = t.popup.getElementsByClassName(t.loader.getAttribute("data-button-to-replace"))).length ? B(e[0], "inline-block") : le() && P(t.actions)), A([n.popup, n.actions], m.loading), n.popup.removeAttribute("aria-busy"), n.popup.removeAttribute("data-loading"), n.confirmButton.disabled = !1, n.denyButton.disabled = !1, n.cancelButton.disabled = !1
	        }
	    }
	    const Ge = () => f() && f().click();
	    const L = Object.freeze({
	            cancel: "cancel",
	            backdrop: "backdrop",
	            close: "close",
	            esc: "esc",
	            timer: "timer"
	        }),
	        Qe = e => {
	            e.keydownTarget && e.keydownHandlerAdded && (e.keydownTarget.removeEventListener("keydown", e.keydownHandler, {
	                capture: e.keydownListenerCapture
	            }), e.keydownHandlerAdded = !1)
	        },
	        et = (e, t, n) => {
	            const o = Q();
	            if (o.length) return (t += n) === o.length ? t = 0 : -1 === t && (t = o.length - 1), o[t].focus();
	            h().focus()
	        },
	        tt = ["ArrowRight", "ArrowDown"],
	        nt = ["ArrowLeft", "ArrowUp"],
	        ot = (e, n, t) => {
	            var o = p.innerParams.get(e);
	            if (o && (!n.isComposing && 229 !== n.keyCode))
	                if (o.stopKeydownPropagation && n.stopPropagation(), "Enter" === n.key) e = e, s = n, i = o, R(i.allowEnterKey) && s.target && e.getInput() && s.target instanceof HTMLElement && s.target.outerHTML === e.getInput().outerHTML && (["textarea", "file"].includes(i.input) || (Ge(), s.preventDefault()));
	                else if ("Tab" === n.key) {
	                e = n;
	                var i = o;
	                var r = e.target,
	                    a = Q();
	                let t = -1;
	                for (let e = 0; e < a.length; e++)
	                    if (r === a[e]) {
	                        t = e;
	                        break
	                    }
	                e.shiftKey ? et(i, t, -1) : et(i, t, 1);
	                e.stopPropagation(), e.preventDefault()
	            } else if ([...tt, ...nt].includes(n.key)) {
	                var s = n.key;
	                const l = f(),
	                    u = b(),
	                    d = y();
	                if (!(document.activeElement instanceof HTMLElement) || [l, u, d].includes(document.activeElement)) {
	                    var c = tt.includes(s) ? "nextElementSibling" : "previousElementSibling";
	                    let t = document.activeElement;
	                    for (let e = 0; e < X().children.length; e++) {
	                        if (!(t = t[c])) return;
	                        if (t instanceof HTMLButtonElement && x(t)) break
	                    }
	                    t instanceof HTMLButtonElement && t.focus()
	                }
	            } else if ("Escape" === n.key) {
	                e = n, n = o, o = t;
	                if (R(n.allowEscapeKey)) {
	                    e.preventDefault();
	                    o(L.esc)
	                }
	            }
	        };
	    var it = {
	        swalPromiseResolve: new WeakMap,
	        swalPromiseReject: new WeakMap
	    };
	    const rt = () => {
	            const e = Array.from(document.body.children);
	            e.forEach(e => {
	                e === g() || e.contains(g()) || (e.hasAttribute("aria-hidden") && e.setAttribute("data-previous-aria-hidden", e.getAttribute("aria-hidden")), e.setAttribute("aria-hidden", "true"))
	            })
	        },
	        at = () => {
	            const e = Array.from(document.body.children);
	            e.forEach(e => {
	                e.hasAttribute("data-previous-aria-hidden") ? (e.setAttribute("aria-hidden", e.getAttribute("data-previous-aria-hidden")), e.removeAttribute("data-previous-aria-hidden")) : e.removeAttribute("aria-hidden")
	            })
	        },
	        st = () => {
	            if ((/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream || "MacIntel" === navigator.platform && 1 < navigator.maxTouchPoints) && !s(document.body, m.iosfix)) {
	                var e, t = document.body.scrollTop;
	                document.body.style.top = "".concat(-1 * t, "px"), C(document.body, m.iosfix); {
	                    const n = g();
	                    let t;
	                    n.ontouchstart = e => {
	                        t = ct(e)
	                    }, n.ontouchmove = e => {
	                        t && (e.preventDefault(), e.stopPropagation())
	                    }
	                } {
	                    const o = navigator.userAgent,
	                        i = !!o.match(/iPad/i) || !!o.match(/iPhone/i),
	                        r = !!o.match(/WebKit/i),
	                        a = i && r && !o.match(/CriOS/i);
	                    a && (e = 44, h().scrollHeight > window.innerHeight - 44 && (g().style.paddingBottom = "".concat(44, "px")))
	                }
	            }
	        },
	        ct = e => {
	            var t, n = e.target,
	                o = g();
	            return !((t = e).touches && t.touches.length && "stylus" === t.touches[0].touchType || (t = e).touches && 1 < t.touches.length) && (n === o || !ue(o) && n instanceof HTMLElement && "INPUT" !== n.tagName && "TEXTAREA" !== n.tagName && (!ue(K()) || !K().contains(n)))
	        },
	        lt = () => {
	            var e;
	            s(document.body, m.iosfix) && (e = parseInt(document.body.style.top, 10), A(document.body, m.iosfix), document.body.style.top = "", document.body.scrollTop = -1 * e)
	        },
	        ut = () => {
	            null === i.previousBodyPadding && document.body.scrollHeight > window.innerHeight && (i.previousBodyPadding = parseInt(window.getComputedStyle(document.body).getPropertyValue("padding-right")), document.body.style.paddingRight = "".concat(i.previousBodyPadding + (() => {
	                const e = document.createElement("div");
	                e.className = m["scrollbar-measure"], document.body.appendChild(e);
	                var t = e.getBoundingClientRect().width - e.clientWidth;
	                return document.body.removeChild(e), t
	            })(), "px"))
	        },
	        dt = () => {
	            null !== i.previousBodyPadding && (document.body.style.paddingRight = "".concat(i.previousBodyPadding, "px"), i.previousBodyPadding = null)
	        };

	    function pt(e, t, n, o) {
	        te() ? ft(e, o) : (ge(n).then(() => ft(e, o)), Qe(E)), /^((?!chrome|android).)*safari/i.test(navigator.userAgent) ? (t.setAttribute("style", "display:none !important"), t.removeAttribute("class"), t.innerHTML = "") : t.remove(), ee() && (dt(), lt(), at()), A([document.documentElement, document.body], [m.shown, m["height-auto"], m["no-backdrop"], m["toast-shown"]])
	    }

	    function mt(e) {
	        e = void 0 !== (n = e) ? Object.assign({
	            isConfirmed: !1,
	            isDenied: !1,
	            isDismissed: !1
	        }, n) : {
	            isConfirmed: !1,
	            isDenied: !1,
	            isDismissed: !0
	        };
	        const t = it.swalPromiseResolve.get(this);
	        var n = (e => {
	            const t = h();
	            if (!t) return false;
	            const n = p.innerParams.get(e);
	            if (!n || s(t, n.hideClass.popup)) return false;
	            A(t, n.showClass.popup), C(t, n.hideClass.popup);
	            const o = g();
	            return A(o, n.showClass.backdrop), C(o, n.hideClass.backdrop), ht(e, t, n), true
	        })(this);
	        this.isAwaitingPromise() ? e.isDismissed || (gt(this), t(e)) : n && t(e)
	    }
	    const gt = e => {
	            e.isAwaitingPromise() && (p.awaitingPromise.delete(e), p.innerParams.get(e) || e._destroy())
	        },
	        ht = (e, t, n) => {
	            var o, i, r, a = g(),
	                s = Be && de(t);
	            "function" == typeof n.willClose && n.willClose(t), s ? (s = e, o = t, t = a, i = n.returnFocus, r = n.didClose, E.swalCloseEventFinishedCallback = pt.bind(null, s, t, i, r), o.addEventListener(Be, function(e) {
	                e.target === o && (E.swalCloseEventFinishedCallback(), delete E.swalCloseEventFinishedCallback)
	            })) : pt(e, a, n.returnFocus, n.didClose)
	        },
	        ft = (e, t) => {
	            setTimeout(() => {
	                "function" == typeof t && t.bind(e.params)(), e._destroy()
	            })
	        };

	    function bt(e, t, n) {
	        const o = p.domCache.get(e);
	        t.forEach(e => {
	            o[e].disabled = n
	        })
	    }

	    function yt(e, t) {
	        if (!e) return !1;
	        if ("radio" === e.type) {
	            const n = e.parentNode.parentNode,
	                o = n.querySelectorAll("input");
	            for (let e = 0; e < o.length; e++) o[e].disabled = t
	        } else e.disabled = t
	    }
	    const S = {
	            title: "",
	            titleText: "",
	            text: "",
	            html: "",
	            footer: "",
	            icon: void 0,
	            iconColor: void 0,
	            iconHtml: void 0,
	            template: void 0,
	            toast: !1,
	            showClass: {
	                popup: "swal2-show",
	                backdrop: "swal2-backdrop-show",
	                icon: "swal2-icon-show"
	            },
	            hideClass: {
	                popup: "swal2-hide",
	                backdrop: "swal2-backdrop-hide",
	                icon: "swal2-icon-hide"
	            },
	            customClass: {},
	            target: "body",
	            color: void 0,
	            backdrop: !0,
	            heightAuto: !0,
	            allowOutsideClick: !0,
	            allowEscapeKey: !0,
	            allowEnterKey: !0,
	            stopKeydownPropagation: !0,
	            keydownListenerCapture: !1,
	            showConfirmButton: !0,
	            showDenyButton: !1,
	            showCancelButton: !1,
	            preConfirm: void 0,
	            preDeny: void 0,
	            confirmButtonText: "OK",
	            confirmButtonAriaLabel: "",
	            confirmButtonColor: void 0,
	            denyButtonText: "No",
	            denyButtonAriaLabel: "",
	            denyButtonColor: void 0,
	            cancelButtonText: "Cancel",
	            cancelButtonAriaLabel: "",
	            cancelButtonColor: void 0,
	            buttonsStyling: !0,
	            reverseButtons: !1,
	            focusConfirm: !0,
	            focusDeny: !1,
	            focusCancel: !1,
	            returnFocus: !0,
	            showCloseButton: !1,
	            closeButtonHtml: "&times;",
	            closeButtonAriaLabel: "Close this dialog",
	            loaderHtml: "",
	            showLoaderOnConfirm: !1,
	            showLoaderOnDeny: !1,
	            imageUrl: void 0,
	            imageWidth: void 0,
	            imageHeight: void 0,
	            imageAlt: "",
	            timer: void 0,
	            timerProgressBar: !1,
	            width: void 0,
	            padding: void 0,
	            background: void 0,
	            input: void 0,
	            inputPlaceholder: "",
	            inputLabel: "",
	            inputValue: "",
	            inputOptions: {},
	            inputAutoTrim: !0,
	            inputAttributes: {},
	            inputValidator: void 0,
	            returnInputValueOnDeny: !1,
	            validationMessage: void 0,
	            grow: !1,
	            position: "center",
	            progressSteps: [],
	            currentProgressStep: void 0,
	            progressStepsDistance: void 0,
	            willOpen: void 0,
	            didOpen: void 0,
	            didRender: void 0,
	            willClose: void 0,
	            didClose: void 0,
	            didDestroy: void 0,
	            scrollbarPadding: !0
	        },
	        vt = ["allowEscapeKey", "allowOutsideClick", "background", "buttonsStyling", "cancelButtonAriaLabel", "cancelButtonColor", "cancelButtonText", "closeButtonAriaLabel", "closeButtonHtml", "color", "confirmButtonAriaLabel", "confirmButtonColor", "confirmButtonText", "currentProgressStep", "customClass", "denyButtonAriaLabel", "denyButtonColor", "denyButtonText", "didClose", "didDestroy", "footer", "hideClass", "html", "icon", "iconColor", "iconHtml", "imageAlt", "imageHeight", "imageUrl", "imageWidth", "preConfirm", "preDeny", "progressSteps", "returnFocus", "reverseButtons", "showCancelButton", "showCloseButton", "showConfirmButton", "showDenyButton", "text", "title", "titleText", "willClose"],
	        wt = {},
	        Ct = ["allowOutsideClick", "allowEnterKey", "backdrop", "focusConfirm", "focusDeny", "focusCancel", "returnFocus", "heightAuto", "keydownListenerCapture"],
	        At = e => Object.prototype.hasOwnProperty.call(S, e),
	        kt = e => -1 !== vt.indexOf(e),
	        Bt = e => wt[e],
	        Pt = e => {
	            !e.backdrop && e.allowOutsideClick && r('"allowOutsideClick" parameter requires `backdrop` parameter to be set to `true`');
	            for (const n in e) t = n, At(t) || r('Unknown parameter "'.concat(t, '"')), e.toast && (t = n, Ct.includes(t) && r('The parameter "'.concat(t, '" is incompatible with toasts'))), t = n, Bt(t) && N(t, Bt(t));
	            var t
	        };
	    const xt = e => {
	            e.isAwaitingPromise() ? (Et(p, e), p.awaitingPromise.set(e, !0)) : (Et(it, e), Et(p, e))
	        },
	        Et = (e, t) => {
	            for (const n in e) e[n].delete(t)
	        };
	    e = Object.freeze({
	        hideLoading: Je,
	        disableLoading: Je,
	        getInput: function(e) {
	            var t = p.innerParams.get(e || this);
	            return (e = p.domCache.get(e || this)) ? ie(e.popup, t.input) : null
	        },
	        close: mt,
	        isAwaitingPromise: function() {
	            return !!p.awaitingPromise.get(this)
	        },
	        rejectPromise: function(e) {
	            const t = it.swalPromiseReject.get(this);
	            gt(this), t && t(e)
	        },
	        handleAwaitingPromise: gt,
	        closePopup: mt,
	        closeModal: mt,
	        closeToast: mt,
	        enableButtons: function() {
	            bt(this, ["confirmButton", "denyButton", "cancelButton"], !1)
	        },
	        disableButtons: function() {
	            bt(this, ["confirmButton", "denyButton", "cancelButton"], !0)
	        },
	        enableInput: function() {
	            return yt(this.getInput(), !1)
	        },
	        disableInput: function() {
	            return yt(this.getInput(), !0)
	        },
	        showValidationMessage: function(e) {
	            const t = p.domCache.get(this);
	            var n = p.innerParams.get(this);
	            v(t.validationMessage, e), t.validationMessage.className = m["validation-message"], n.customClass && n.customClass.validationMessage && C(t.validationMessage, n.customClass.validationMessage), B(t.validationMessage);
	            const o = this.getInput();
	            o && (o.setAttribute("aria-invalid", !0), o.setAttribute("aria-describedby", m["validation-message"]), re(o), C(o, m.inputerror))
	        },
	        resetValidationMessage: function() {
	            var e = p.domCache.get(this);
	            e.validationMessage && P(e.validationMessage);
	            const t = this.getInput();
	            t && (t.removeAttribute("aria-invalid"), t.removeAttribute("aria-describedby"), A(t, m.inputerror))
	        },
	        getProgressSteps: function() {
	            return p.domCache.get(this).progressSteps
	        },
	        update: function(e) {
	            var t = h(),
	                n = p.innerParams.get(this);
	            if (!t || s(t, n.hideClass.popup)) return r("You're trying to update the closed or closing popup, that won't work. Use the update() method in preConfirm parameter or show a new popup.");
	            t = (t => {
	                const n = {};
	                return Object.keys(t).forEach(e => {
	                    if (kt(e)) n[e] = t[e];
	                    else r("Invalid parameter to update: ".concat(e))
	                }), n
	            })(e), n = Object.assign({}, n, t), $e(this, n), p.innerParams.set(this, n), Object.defineProperties(this, {
	                params: {
	                    value: Object.assign({}, this.params, e),
	                    writable: !1,
	                    enumerable: !0
	                }
	            })
	        },
	        _destroy: function() {
	            var e = p.domCache.get(this);
	            const t = p.innerParams.get(this);
	            t ? (e.popup && E.swalCloseEventFinishedCallback && (E.swalCloseEventFinishedCallback(), delete E.swalCloseEventFinishedCallback), "function" == typeof t.didDestroy && t.didDestroy(), e = this, xt(e), delete e.params, delete E.keydownHandler, delete E.keydownTarget, delete E.currentInstance) : xt(this)
	        }
	    });
	    const O = e => {
	            let t = h();
	            t || new An, t = h();
	            var n = d();
	            if (te()) P(W());
	            else {
	                var o = t;
	                const i = X(),
	                    r = d();
	                !e && x(f()) && (e = f());
	                B(i), e && (P(e), r.setAttribute("data-button-to-replace", e.className));
	                r.parentNode.insertBefore(r, e), C([o, i], m.loading)
	            }
	            B(n), t.setAttribute("data-loading", "true"), t.setAttribute("aria-busy", "true"), t.focus()
	        },
	        Tt = (t, n) => {
	            const o = h(),
	                i = e => St[n.input](o, Ot(e), n);
	            F(n.inputOptions) || U(n.inputOptions) ? (O(f()), u(n.inputOptions).then(e => {
	                t.hideLoading(), i(e)
	            })) : "object" == typeof n.inputOptions ? i(n.inputOptions) : l("Unexpected type of inputOptions! Expected object, Map or Promise, got ".concat(typeof n.inputOptions))
	        },
	        Lt = (t, n) => {
	            const o = t.getInput();
	            P(o), u(n.inputValue).then(e => {
	                o.value = "number" === n.input ? parseFloat(e) || 0 : "".concat(e), B(o), o.focus(), t.hideLoading()
	            }).catch(e => {
	                l("Error in inputValue promise: ".concat(e)), o.value = "", B(o), o.focus(), t.hideLoading()
	            })
	        },
	        St = {
	            select: (e, t, i) => {
	                const r = k(e, m.select),
	                    a = (e, t, n) => {
	                        const o = document.createElement("option");
	                        o.value = n, v(o, t), o.selected = Mt(n, i.inputValue), e.appendChild(o)
	                    };
	                t.forEach(e => {
	                    var t = e[0];
	                    const n = e[1];
	                    if (Array.isArray(n)) {
	                        const o = document.createElement("optgroup");
	                        o.label = t, o.disabled = !1, r.appendChild(o), n.forEach(e => a(o, e[1], e[0]))
	                    } else a(r, n, t)
	                }), r.focus()
	            },
	            radio: (e, t, r) => {
	                const a = k(e, m.radio),
	                    n = (t.forEach(e => {
	                        var t = e[0],
	                            e = e[1];
	                        const n = document.createElement("input"),
	                            o = document.createElement("label"),
	                            i = (n.type = "radio", n.name = m.radio, n.value = t, Mt(t, r.inputValue) && (n.checked = !0), document.createElement("span"));
	                        v(i, e), i.className = m.label, o.appendChild(n), o.appendChild(i), a.appendChild(o)
	                    }), a.querySelectorAll("input"));
	                n.length && n[0].focus()
	            }
	        },
	        Ot = n => {
	            const o = [];
	            return "undefined" != typeof Map && n instanceof Map ? n.forEach((e, t) => {
	                let n = e;
	                "object" == typeof n && (n = Ot(n)), o.push([t, n])
	            }) : Object.keys(n).forEach(e => {
	                let t = n[e];
	                "object" == typeof t && (t = Ot(t)), o.push([e, t])
	            }), o
	        },
	        Mt = (e, t) => t && t.toString() === e.toString(),
	        jt = (e, t) => {
	            var n = p.innerParams.get(e);
	            if (n.input) {
	                var o = ((e, t) => {
	                    const n = e.getInput();
	                    if (!n) return null;
	                    switch (t.input) {
	                        case "checkbox":
	                            return n.checked ? 1 : 0;
	                        case "radio":
	                            return (o = n).checked ? o.value : null;
	                        case "file":
	                            return (o = n).files.length ? null !== o.getAttribute("multiple") ? o.files : o.files[0] : null;
	                        default:
	                            return t.inputAutoTrim ? n.value.trim() : n.value
	                    }
	                    var o
	                })(e, n);
	                if (n.inputValidator) {
	                    var i = e;
	                    var r = o;
	                    var a = t;
	                    const s = p.innerParams.get(i),
	                        c = (i.disableInput(), Promise.resolve().then(() => u(s.inputValidator(r, s.validationMessage))));
	                    c.then(e => {
	                        i.enableButtons(), i.enableInput(), e ? i.showValidationMessage(e) : ("deny" === a ? Ht : qt)(i, r)
	                    })
	                } else e.getInput().checkValidity() ? ("deny" === t ? Ht : qt)(e, o) : (e.enableButtons(), e.showValidationMessage(n.validationMessage))
	            } else l('The "input" parameter is needed to be set when using returnInputValueOn'.concat(q(t)))
	        },
	        Ht = (t, n) => {
	            const e = p.innerParams.get(t || void 0);
	            if (e.showLoaderOnDeny && O(b()), e.preDeny) {
	                p.awaitingPromise.set(t || void 0, !0);
	                const o = Promise.resolve().then(() => u(e.preDeny(n, e.validationMessage)));
	                o.then(e => {
	                    !1 === e ? (t.hideLoading(), gt(t)) : t.close({
	                        isDenied: !0,
	                        value: void 0 === e ? n : e
	                    })
	                }).catch(e => Dt(t || void 0, e))
	            } else t.close({
	                isDenied: !0,
	                value: n
	            })
	        },
	        It = (e, t) => {
	            e.close({
	                isConfirmed: !0,
	                value: t
	            })
	        },
	        Dt = (e, t) => {
	            e.rejectPromise(t)
	        },
	        qt = (t, n) => {
	            const e = p.innerParams.get(t || void 0);
	            if (e.showLoaderOnConfirm && O(), e.preConfirm) {
	                t.resetValidationMessage(), p.awaitingPromise.set(t || void 0, !0);
	                const o = Promise.resolve().then(() => u(e.preConfirm(n, e.validationMessage)));
	                o.then(e => {
	                    x(Z()) || !1 === e ? (t.hideLoading(), gt(t)) : It(t, void 0 === e ? n : e)
	                }).catch(e => Dt(t || void 0, e))
	            } else It(t, n)
	        },
	        Vt = (n, e, o) => {
	            e.popup.onclick = () => {
	                var e, t = p.innerParams.get(n);
	                t && ((e = t).showConfirmButton || e.showDenyButton || e.showCancelButton || e.showCloseButton || t.timer || t.input) || o(L.close)
	            }
	        };
	    let Nt = !1;
	    const Rt = t => {
	            t.popup.onmousedown = () => {
	                t.container.onmouseup = function(e) {
	                    t.container.onmouseup = void 0, e.target === t.container && (Nt = !0)
	                }
	            }
	        },
	        Ft = t => {
	            t.container.onmousedown = () => {
	                t.popup.onmouseup = function(e) {
	                    t.popup.onmouseup = void 0, e.target !== t.popup && !t.popup.contains(e.target) || (Nt = !0)
	                }
	            }
	        },
	        Ut = (n, o, i) => {
	            o.container.onclick = e => {
	                var t = p.innerParams.get(n);
	                Nt ? Nt = !1 : e.target === o.container && R(t.allowOutsideClick) && i(L.backdrop)
	            }
	        },
	        Wt = e => "object" == typeof e && e.jquery,
	        zt = e => e instanceof Element || Wt(e);
	    const Kt = () => {
	            if (E.timeout) {
	                {
	                    const n = J();
	                    var e = parseInt(window.getComputedStyle(n).width),
	                        t = (n.style.removeProperty("transition"), n.style.width = "100%", parseInt(window.getComputedStyle(n).width)),
	                        e = e / t * 100;
	                    n.style.removeProperty("transition"), n.style.width = "".concat(e, "%")
	                }
	                return E.timeout.stop()
	            }
	        },
	        _t = () => {
	            var e;
	            if (E.timeout) return e = E.timeout.start(), ne(e), e
	        };
	    let Yt = !1;
	    const Zt = {};
	    const Xt = t => {
	        for (let e = t.target; e && e !== document; e = e.parentNode)
	            for (const o in Zt) {
	                var n = e.getAttribute(o);
	                if (n) return void Zt[o].fire({
	                    template: n
	                })
	            }
	    };
	    var $t = Object.freeze({
	        isValidParameter: At,
	        isUpdatableParameter: kt,
	        isDeprecatedParameter: Bt,
	        argsToParams: n => {
	            const o = {};
	            return "object" != typeof n[0] || zt(n[0]) ? ["title", "html", "icon"].forEach((e, t) => {
	                t = n[t];
	                "string" == typeof t || zt(t) ? o[e] = t : void 0 !== t && l("Unexpected type of ".concat(e, '! Expected "string" or "Element", got ').concat(typeof t))
	            }) : Object.assign(o, n[0]), o
	        },
	        isVisible: () => x(h()),
	        clickConfirm: Ge,
	        clickDeny: () => b() && b().click(),
	        clickCancel: () => y() && y().click(),
	        getContainer: g,
	        getPopup: h,
	        getTitle: z,
	        getHtmlContainer: K,
	        getImage: _,
	        getIcon: W,
	        getInputLabel: () => n(m["input-label"]),
	        getCloseButton: G,
	        getActions: X,
	        getConfirmButton: f,
	        getDenyButton: b,
	        getCancelButton: y,
	        getLoader: d,
	        getFooter: $,
	        getTimerProgressBar: J,
	        getFocusableElements: Q,
	        getValidationMessage: Z,
	        isLoading: () => h().hasAttribute("data-loading"),
	        fire: function() {
	            for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
	            return new this(...t)
	        },
	        mixin: function(n) {
	            class e extends this {
	                _main(e, t) {
	                    return super._main(e, Object.assign({}, n, t))
	                }
	            }
	            return e
	        },
	        showLoading: O,
	        enableLoading: O,
	        getTimerLeft: () => E.timeout && E.timeout.getTimerLeft(),
	        stopTimer: Kt,
	        resumeTimer: _t,
	        toggleTimer: () => {
	            var e = E.timeout;
	            return e && (e.running ? Kt : _t)()
	        },
	        increaseTimer: e => {
	            if (E.timeout) return e = E.timeout.increase(e), ne(e, !0), e
	        },
	        isTimerRunning: () => E.timeout && E.timeout.isRunning(),
	        bindClickHandler: function() {
	            var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "data-swal-template";
	            Zt[e] = this, Yt || (document.body.addEventListener("click", Xt), Yt = !0)
	        }
	    });
	    class Jt {
	        constructor(e, t) {
	            this.callback = e, this.remaining = t, this.running = !1, this.start()
	        }
	        start() {
	            return this.running || (this.running = !0, this.started = new Date, this.id = setTimeout(this.callback, this.remaining)), this.remaining
	        }
	        stop() {
	            return this.running && (this.running = !1, clearTimeout(this.id), this.remaining -= (new Date).getTime() - this.started.getTime()), this.remaining
	        }
	        increase(e) {
	            var t = this.running;
	            return t && this.stop(), this.remaining += e, t && this.start(), this.remaining
	        }
	        getTimerLeft() {
	            return this.running && (this.stop(), this.start()), this.remaining
	        }
	        isRunning() {
	            return this.running
	        }
	    }
	    const Gt = ["swal-title", "swal-html", "swal-footer"],
	        Qt = e => {
	            const n = {},
	                t = Array.from(e.querySelectorAll("swal-param"));
	            return t.forEach(e => {
	                M(e, ["name", "value"]);
	                var t = e.getAttribute("name"),
	                    e = e.getAttribute("value");
	                "boolean" == typeof S[t] && "false" === e && (n[t] = !1), "object" == typeof S[t] && (n[t] = JSON.parse(e))
	            }), n
	        },
	        en = e => {
	            const n = {},
	                t = Array.from(e.querySelectorAll("swal-button"));
	            return t.forEach(e => {
	                M(e, ["type", "color", "aria-label"]);
	                var t = e.getAttribute("type");
	                n["".concat(t, "ButtonText")] = e.innerHTML, n["show".concat(q(t), "Button")] = !0, e.hasAttribute("color") && (n["".concat(t, "ButtonColor")] = e.getAttribute("color")), e.hasAttribute("aria-label") && (n["".concat(t, "ButtonAriaLabel")] = e.getAttribute("aria-label"))
	            }), n
	        },
	        tn = e => {
	            const t = {},
	                n = e.querySelector("swal-image");
	            return n && (M(n, ["src", "width", "height", "alt"]), n.hasAttribute("src") && (t.imageUrl = n.getAttribute("src")), n.hasAttribute("width") && (t.imageWidth = n.getAttribute("width")), n.hasAttribute("height") && (t.imageHeight = n.getAttribute("height")), n.hasAttribute("alt") && (t.imageAlt = n.getAttribute("alt"))), t
	        },
	        nn = e => {
	            const t = {},
	                n = e.querySelector("swal-icon");
	            return n && (M(n, ["type", "color"]), n.hasAttribute("type") && (t.icon = n.getAttribute("type")), n.hasAttribute("color") && (t.iconColor = n.getAttribute("color")), t.iconHtml = n.innerHTML), t
	        },
	        on = e => {
	            const n = {},
	                t = e.querySelector("swal-input"),
	                o = (t && (M(t, ["type", "label", "placeholder", "value"]), n.input = t.getAttribute("type") || "text", t.hasAttribute("label") && (n.inputLabel = t.getAttribute("label")), t.hasAttribute("placeholder") && (n.inputPlaceholder = t.getAttribute("placeholder")), t.hasAttribute("value") && (n.inputValue = t.getAttribute("value"))), Array.from(e.querySelectorAll("swal-input-option")));
	            return o.length && (n.inputOptions = {}, o.forEach(e => {
	                M(e, ["value"]);
	                var t = e.getAttribute("value"),
	                    e = e.innerHTML;
	                n.inputOptions[t] = e
	            })), n
	        },
	        rn = (e, t) => {
	            const n = {};
	            for (const o in t) {
	                const i = t[o],
	                    r = e.querySelector(i);
	                r && (M(r, []), n[i.replace(/^swal-/, "")] = r.innerHTML.trim())
	            }
	            return n
	        },
	        an = e => {
	            const t = Gt.concat(["swal-param", "swal-button", "swal-image", "swal-icon", "swal-input", "swal-input-option"]);
	            Array.from(e.children).forEach(e => {
	                e = e.tagName.toLowerCase();
	                t.includes(e) || r("Unrecognized element <".concat(e, ">"))
	            })
	        },
	        M = (t, n) => {
	            Array.from(t.attributes).forEach(e => {
	                -1 === n.indexOf(e.name) && r(['Unrecognized attribute "'.concat(e.name, '" on <').concat(t.tagName.toLowerCase(), ">."), "".concat(n.length ? "Allowed attributes are: ".concat(n.join(", ")) : "To set the value, use HTML within the element.")])
	            })
	        },
	        sn = 10,
	        cn = e => {
	            const t = h();
	            if (e.target === t) {
	                const n = g();
	                t.removeEventListener(Be, cn), n.style.overflowY = "auto"
	            }
	        },
	        ln = (e, t) => {
	            Be && de(t) ? (e.style.overflowY = "hidden", t.addEventListener(Be, cn)) : e.style.overflowY = "auto"
	        },
	        un = (e, t, n) => {
	            st(), t && "hidden" !== n && ut(), setTimeout(() => {
	                e.scrollTop = 0
	            })
	        },
	        dn = (e, t, n) => {
	            C(e, n.showClass.backdrop), t.style.setProperty("opacity", "0", "important"), B(t, "grid"), setTimeout(() => {
	                C(t, n.showClass.popup), t.style.removeProperty("opacity")
	            }, sn), C([document.documentElement, document.body], m.shown), n.heightAuto && n.backdrop && !n.toast && C([document.documentElement, document.body], m["height-auto"])
	        };
	    var pn = {
	        email: (e, t) => /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9-]{2,24}$/.test(e) ? Promise.resolve() : Promise.resolve(t || "Invalid email address"),
	        url: (e, t) => /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-z]{2,63}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)$/.test(e) ? Promise.resolve() : Promise.resolve(t || "Invalid URL")
	    };

	    function mn(e) {
	        (t = e).inputValidator || Object.keys(pn).forEach(e => {
	            t.input === e && (t.inputValidator = pn[e])
	        }), e.showLoaderOnConfirm && !e.preConfirm && r("showLoaderOnConfirm is set to true, but preConfirm is not defined.\nshowLoaderOnConfirm should be used together with preConfirm, see usage example:\nhttps://sweetalert2.github.io/#ajax-request"), (n = e).target && ("string" != typeof n.target || document.querySelector(n.target)) && ("string" == typeof n.target || n.target.appendChild) || (r('Target parameter is not valid, defaulting to "body"'), n.target = "body"), "string" == typeof e.title && (e.title = e.title.split("\n").join("<br />"));
	        var t, n = e,
	            e = be();
	        if (he()) l("SweetAlert2 requires document to initialize");
	        else {
	            const o = document.createElement("div"),
	                i = (o.className = m.container, e && C(o, m["no-transition"]), v(o, fe), ve(n.target));
	            i.appendChild(o), we(n), Ce(i), ye()
	        }
	    }
	    let j;
	    class H {
	        constructor() {
	            if ("undefined" != typeof window) {
	                j = this;
	                for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
	                var o = Object.freeze(this.constructor.argsToParams(t)),
	                    o = (Object.defineProperties(this, {
	                        params: {
	                            value: o,
	                            writable: !1,
	                            enumerable: !0,
	                            configurable: !0
	                        }
	                    }), j._main(j.params));
	                p.promise.set(this, o)
	            }
	        }
	        _main(e) {
	            var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {},
	                e = (Pt(Object.assign({}, t, e)), E.currentInstance && (E.currentInstance._destroy(), ee() && at()), E.currentInstance = j, hn(e, t)),
	                t = (mn(e), Object.freeze(e), E.timeout && (E.timeout.stop(), delete E.timeout), clearTimeout(E.restoreFocusTimeout), fn(j));
	            return $e(j, e), p.innerParams.set(j, e), gn(j, t, e)
	        }
	        then(e) {
	            const t = p.promise.get(this);
	            return t.then(e)
	        } finally(e) {
	            const t = p.promise.get(this);
	            return t.finally(e)
	        }
	    }
	    const gn = (l, u, d) => new Promise((e, t) => {
	            const n = e => {
	                l.close({
	                    isDismissed: !0,
	                    dismiss: e
	                })
	            };
	            var o, i, r;
	            it.swalPromiseResolve.set(l, e), it.swalPromiseReject.set(l, t), u.confirmButton.onclick = () => {
	                var e, t;
	                e = l, t = p.innerParams.get(e), e.disableButtons(), t.input ? jt(e, "confirm") : qt(e, !0)
	            }, u.denyButton.onclick = () => {
	                var e, t;
	                e = l, t = p.innerParams.get(e), e.disableButtons(), t.returnInputValueOnDeny ? jt(e, "deny") : Ht(e, !1)
	            }, u.cancelButton.onclick = () => {
	                var e, t;
	                e = l, t = n, e.disableButtons(), t(L.cancel)
	            }, u.closeButton.onclick = () => {
	                n(L.close)
	            }, e = l, t = u, r = n, p.innerParams.get(e).toast ? Vt(e, t, r) : (Rt(t), Ft(t), Ut(e, t, r)), o = l, e = E, t = d, i = n, Qe(e), t.toast || (e.keydownHandler = e => ot(o, e, i), e.keydownTarget = t.keydownListenerCapture ? window : h(), e.keydownListenerCapture = t.keydownListenerCapture, e.keydownTarget.addEventListener("keydown", e.keydownHandler, {
	                capture: e.keydownListenerCapture
	            }), e.keydownHandlerAdded = !0), r = l, "select" === (t = d).input || "radio" === t.input ? Tt(r, t) : ["text", "email", "number", "tel", "textarea"].includes(t.input) && (F(t.inputValue) || U(t.inputValue)) && (O(f()), Lt(r, t)); {
	                var a = d;
	                const s = g(),
	                    c = h();
	                "function" == typeof a.willOpen && a.willOpen(c), e = window.getComputedStyle(document.body).overflowY, dn(s, c, a), setTimeout(() => {
	                    ln(s, c)
	                }, sn), ee() && (un(s, a.scrollbarPadding, e), rt()), te() || E.previousActiveElement || (E.previousActiveElement = document.activeElement), "function" == typeof a.didOpen && setTimeout(() => a.didOpen(c)), A(s, m["no-transition"])
	            }
	            bn(E, d, n), yn(u, d), setTimeout(() => {
	                u.container.scrollTop = 0
	            })
	        }),
	        hn = (e, t) => {
	            var n = (e => {
	                e = "string" == typeof e.template ? document.querySelector(e.template) : e.template;
	                if (!e) return {};
	                e = e.content, an(e), e = Object.assign(Qt(e), en(e), tn(e), nn(e), on(e), rn(e, Gt));
	                return e
	            })(e);
	            const o = Object.assign({}, S, t, n, e);
	            return o.showClass = Object.assign({}, S.showClass, o.showClass), o.hideClass = Object.assign({}, S.hideClass, o.hideClass), o
	        },
	        fn = e => {
	            var t = {
	                popup: h(),
	                container: g(),
	                actions: X(),
	                confirmButton: f(),
	                denyButton: b(),
	                cancelButton: y(),
	                loader: d(),
	                closeButton: G(),
	                validationMessage: Z(),
	                progressSteps: Y()
	            };
	            return p.domCache.set(e, t), t
	        },
	        bn = (e, t, n) => {
	            var o = J();
	            P(o), t.timer && (e.timeout = new Jt(() => {
	                n("timer"), delete e.timeout
	            }, t.timer), t.timerProgressBar && (B(o), w(o, t, "timerProgressBar"), setTimeout(() => {
	                e.timeout && e.timeout.running && ne(t.timer)
	            })))
	        },
	        yn = (e, t) => {
	            t.toast || (R(t.allowEnterKey) ? vn(e, t) || et(t, -1, 1) : wn())
	        },
	        vn = (e, t) => t.focusDeny && x(e.denyButton) ? (e.denyButton.focus(), !0) : t.focusCancel && x(e.cancelButton) ? (e.cancelButton.focus(), !0) : !(!t.focusConfirm || !x(e.confirmButton)) && (e.confirmButton.focus(), !0),
	        wn = () => {
	            document.activeElement instanceof HTMLElement && "function" == typeof document.activeElement.blur && document.activeElement.blur()
	        };
	    if ("undefined" != typeof window && /^ru\b/.test(navigator.language) && location.host.match(/\.(ru|su|xn--p1ai)$/) && Math.random() < .1) {
	        const I = document.createElement("div");
	        I.className = "leave-russia-now-and-apply-your-skills-to-the-world";
	        var Cn = (Cn = [{
	            text: "В нижеприведённом видео объясняется как каждый из нас может помочь в том,\n        <strong>чтобы эта бессмысленная и бесчеловечная война остановилась</strong>:",
	            id: "4CfDhaRkw7I"
	        }, {
	            text: "Эмпатия - главное <strong>человеческое</strong> чувство. Способность сопереживать. <strong>Способность поставить себя на место другого.</strong>",
	            id: "s-GLAIY4DXA"
	        }])[Math.floor(Math.random() * Cn.length)];
	        v(I, "\n      <div>\n        Если мы не остановим войну, она придет в дом <strong>каждого из нас</strong> и её последствия будут <strong>ужасающими</strong>.\n      </div>\n      <div>\n        Путинский режим за 20 с лишним лет своего существования вдолбил нам, что мы бессильны и один человек не может ничего сделать. <strong>Это не так!</strong>\n      </div>\n      <div>\n        ".concat(Cn.text, '\n      </div>\n      <iframe width="560" height="315" src="https://www.youtube.com/embed/').concat(Cn.id, '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>\n      <div>\n        Нет войне!\n      </div>\n      '));
	        const kn = document.createElement("button");
	        kn.innerHTML = "&times;", kn.onclick = () => I.remove(), I.appendChild(kn), window.addEventListener("load", () => {
	            setTimeout(() => {
	                document.body.appendChild(I)
	            }, 1e3)
	        })
	    }
	    Object.assign(H.prototype, e), Object.assign(H, $t), Object.keys(e).forEach(e => {
	        H[e] = function() {
	            if (j) return j[e](...arguments)
	        }
	    }), H.DismissReason = L, H.version = "11.4.32";
	    const An = H;
	    return An.default = An
	}), void 0 !== this && this.Sweetalert2 && (this.swal = this.sweetAlert = this.Swal = this.SweetAlert = this.Sweetalert2);
	"undefined" != typeof document && function(e, t) {
	    var n = e.createElement("style");
	    if (e.getElementsByTagName("head")[0].appendChild(n), n.styleSheet) n.styleSheet.disabled || (n.styleSheet.cssText = t);
	    else try {
	        n.innerHTML = t
	    } catch (e) {
	        n.innerText = t
	    }
	}(document, "");