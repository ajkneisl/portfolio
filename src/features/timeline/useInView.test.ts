import React from "react"
import { act, renderHook } from "@testing-library/react"
import { afterEach, describe, expect, it, vi } from "vitest"
import useInView from "./useInView"

type ObserverCallback = (entries: Array<{ isIntersecting: boolean }>) => void

/** Captures the observers useInView creates so tests can drive intersection by hand. */
function stubIntersectionObserver() {
    const instances: Array<{
        callback: ObserverCallback
        observe: ReturnType<typeof vi.fn>
        disconnect: ReturnType<typeof vi.fn>
    }> = []

    const Stub = vi.fn(function (this: unknown, callback: ObserverCallback) {
        const instance = {
            callback,
            observe: vi.fn(),
            disconnect: vi.fn(),
            unobserve: vi.fn(),
            takeRecords: vi.fn()
        }
        instances.push(instance)
        return instance
    })

    vi.stubGlobal("IntersectionObserver", Stub)
    return { Stub, instances }
}

const refTo = (el: HTMLDivElement | null) =>
    ({ current: el }) as React.RefObject<HTMLDivElement>

afterEach(() => {
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
})

describe("useInView", () => {
    it("starts out not visible", () => {
        stubIntersectionObserver()
        const { result } = renderHook(() =>
            useInView(refTo(document.createElement("div")))
        )

        expect(result.current).toBe(false)
    })

    it("observes the element the ref points at", () => {
        const { instances } = stubIntersectionObserver()
        const el = document.createElement("div")

        renderHook(() => useInView(refTo(el)))

        expect(instances).toHaveLength(1)
        expect(instances[0].observe).toHaveBeenCalledWith(el)
    })

    it("becomes visible once the element intersects", () => {
        const { instances } = stubIntersectionObserver()
        const { result } = renderHook(() =>
            useInView(refTo(document.createElement("div")))
        )

        act(() => instances[0].callback([{ isIntersecting: true }]))

        expect(result.current).toBe(true)
    })

    it("stays invisible while the element is not intersecting", () => {
        const { instances } = stubIntersectionObserver()
        const { result } = renderHook(() =>
            useInView(refTo(document.createElement("div")))
        )

        act(() => instances[0].callback([{ isIntersecting: false }]))

        expect(result.current).toBe(false)
    })

    it("stays visible after the element scrolls back out of view", () => {
        const { instances } = stubIntersectionObserver()
        const { result } = renderHook(() =>
            useInView(refTo(document.createElement("div")))
        )

        act(() => instances[0].callback([{ isIntersecting: true }]))
        act(() => instances[0].callback([{ isIntersecting: false }]))

        expect(result.current).toBe(true)
    })

    it("uses a 0.1 threshold", () => {
        const { Stub } = stubIntersectionObserver()
        renderHook(() => useInView(refTo(document.createElement("div"))))

        expect(Stub).toHaveBeenCalledWith(expect.any(Function), {
            threshold: 0.1
        })
    })

    it("disconnects the observer on unmount", () => {
        const { instances } = stubIntersectionObserver()
        const { unmount } = renderHook(() =>
            useInView(refTo(document.createElement("div")))
        )

        unmount()

        expect(instances[0].disconnect).toHaveBeenCalledTimes(1)
    })

    it("creates no observer when the ref is empty", () => {
        const { Stub } = stubIntersectionObserver()
        const { result } = renderHook(() => useInView(refTo(null)))

        expect(Stub).not.toHaveBeenCalled()
        expect(result.current).toBe(false)
    })
})
