import { NextRequest, NextResponse } from "next/server";

type Product = {
    id: string;
    name: string;
    price: number;
    description?: string;
    inStock: boolean;
};

const products: Product[] = [
    { id: "1", name: "Sample Widget", price: 19.99, description: "A demo widget", inStock: true },
    { id: "2", name: "Example Gadget", price: 49.5, description: "A demo gadget", inStock: false },
    { id: "3", name: "Test Thingamajig", price: 29.99, inStock: true },
    { id: "4", name: "Demo Doohickey", price: 9.99, description: "A demo doohickey", inStock: true },
    { id: "5", name: "Mock Contraption", price: 99.99, inStock: false },
    { id: "6", name: "Fictional Gizmo", price: 59.99, description: "A demo gizmo", inStock: true },
    { id: "7", name: "Virtual Device", price: 39.99, inStock: true },
    { id: "8", name: "Imaginary Apparatus", price: 24.99, description: "A demo apparatus", inStock: true },  

      { id: "9", name: "Sample Widget", price: 19.99, description: "A demo widget", inStock: true },
    { id: "10", name: "Example Gadget", price: 49.5, description: "A demo gadget", inStock: false },
    { id: "11", name: "Test Thingamajig", price: 29.99, inStock: true },
    { id: "12", name: "Demo Doohickey", price: 9.99, description: "A demo doohickey", inStock: true },
    { id: "13", name: "Mock Contraption", price: 99.99, inStock: false },
    { id: "14", name: "Fictional Gizmo", price: 59.99, description: "A demo gizmo", inStock: true },
    { id: "15", name: "Virtual Device", price: 39.99, inStock: true },
    { id: "16", name: "Imaginary Apparatus", price: 24.99, description: "A demo apparatus", inStock: true },  


      { id: "17", name: "Sample Widget", price: 19.99, description: "A demo widget", inStock: true },
    { id: "18", name: "Example Gadget", price: 49.5, description: "A demo gadget", inStock: false },
    { id: "19", name: "Test Thingamajig", price: 29.99, inStock: true },
    { id: "20", name: "Demo Doohickey", price: 9.99, description: "A demo doohickey", inStock: true },
    { id: "21", name: "Mock Contraption", price: 99.99, inStock: false },
    { id: "22", name: "Fictional Gizmo", price: 59.99, description: "A demo gizmo", inStock: true },
    { id: "23", name: "Virtual Device", price: 39.99, inStock: true },
    { id: "24", name: "Imaginary Apparatus", price: 24.99, description: "A demo apparatus", inStock: true },  


];

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

function jsonResponse(body: unknown, status = 200) {
    return NextResponse.json(body, { status, headers: corsHeaders });
}

export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    const page = url.searchParams.get("page");

    if (id) {
        const product = products.find((p) => p.id === id);
        if (!product) return jsonResponse({ error: "Product not found" }, 404);
        return jsonResponse(product);
    }

    if(page){
        const pageNum = parseInt(page, 10);
        const perPage = 8; // Fixed items per page
        const start = (pageNum - 1) * perPage;
        const paginatedProducts = products.slice(start, start + perPage);
        return jsonResponse(paginatedProducts);
    }

    // return all
    return jsonResponse(products);
}

export async function POST(req: NextRequest) {
    if (!req.headers.get("content-type")?.includes("application/json")) {
        return jsonResponse({ error: "Expected application/json" }, 415);
    }

    let body: any;
    try {
        body = await req.json();
    } catch {
        return jsonResponse({ error: "Invalid JSON body" }, 400);
    }

    const { name, price, description, inStock } = body ?? {};

    if (typeof name !== "string" || name.trim() === "") {
        return jsonResponse({ error: "Missing or invalid 'name'" }, 400);
    }
    if (typeof price !== "number" || Number.isNaN(price)) {
        return jsonResponse({ error: "Missing or invalid 'price'" }, 400);
    }

    const id =
        typeof globalThis?.crypto?.randomUUID === "function"
            ? globalThis.crypto.randomUUID()
            : String(Date.now());

    const newProduct: Product = {
        id,
        name: name.trim(),
        price,
        description: typeof description === "string" ? description : undefined,
        inStock: typeof inStock === "boolean" ? inStock : true,
    };

    products.push(newProduct);

    return jsonResponse(newProduct, 201);
}

// Handle CORS preflight
export async function OPTIONS() {
    return new NextResponse(null, { status: 204, headers: corsHeaders });
}