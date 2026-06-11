// Inventory system can have only two product states..Enum is used to store a fixed set of related values under one name.
//  if we change we get error.
enum ProductStatus {

    // Product is available for sale
    InStock = "In Stock",

    // stock is empty
    OutOfStock = "Out Of Stock"
}

// Defines what information every product must contain
interface Product {
    id: number;
    name: string;
    price: number;
    stock: number;
    status: ProductStatus;
}

// Logger is responsible for tracking system activities
class Logger {

    // Records successful operations performed in the inventory
    info(message: string): void {
        console.log(`[INFO] ${message}`);
    }

    // Records errors or unexpected situations
    error(message: string): void {
        console.log(`[ERROR] ${message}`);
    }
}

// Inventory class manages all product-related operations
class Inventory {

    // Acts as the inventory database (stored in memory)
    private products: Product[] = [];

    // Logger object used to track inventory actions
    private logger = new Logger();

    // Adds a new product to inventory
    addProduct(product: Product): void {

        // Store the product in inventory
        this.products.push(product);

        // Record successful product creation
        this.logger.info(
            `${product.name} added successfully`
        );
    }

    // Displays all products available in inventory
    showProducts(): void {

        // Show inventory report heading
        console.log("\nProducts List:");

        // Print all stored products
        console.log(this.products);
    }

    // Searches inventory using product ID
    searchProduct(id: number): Product {

        // Find matching product
        const product = this.products.find(
            p => p.id === id
        );

        // Stop operation if product does not exist
        if (!product) {
            throw new Error("Product not found");
        }

        // Return matching product details
        return product;
    }

    // Updates stock whenever new items arrive or stock changes
    updateStock(
        id: number,
        newStock: number
    ): void {

        // Verify that the product exists
        const product = this.searchProduct(id);

        // Replace old stock with new stock quantity
        product.stock = newStock;

        // Automatically update product availability
        product.status =
            newStock > 0
                ? ProductStatus.InStock
                : ProductStatus.OutOfStock;

        // Record stock modification
        this.logger.info(
            `${product.name} stock updated`
        );
    }

    // Removes a product that is no longer sold
    deleteProduct(id: number): void {

        // Ensure the product exists before removal
        const product = this.searchProduct(id);

        // Remove product from inventory
        this.products = this.products.filter(
            p => p.id !== id
        );

        // Record product deletion
        this.logger.info(
            `${product.name} deleted`
        );
    }
}

// Create inventory system instance
const inventory = new Inventory();

try {

    // Register Laptop product in inventory
    inventory.addProduct({
        id: 1,
        name: "Laptop",
        price: 50000,
        stock: 10,
        status: ProductStatus.InStock
    });

    // Register Mouse product in inventory
    inventory.addProduct({
        id: 2,
        name: "Mouse",
        price: 500,
        stock: 20,
        status: ProductStatus.InStock
    });

    // View current inventory report
    inventory.showProducts();

    // Search inventory for Laptop using ID
    console.log("\nSearch Product:");
    console.log(
        inventory.searchProduct(1)
    );

    // Increase Laptop stock after receiving new stock
    inventory.updateStock(1, 15);

    // View inventory after stock update
    inventory.showProducts();

    // Remove Mouse from inventory
    inventory.deleteProduct(2);

    // View final inventory state
    inventory.showProducts();

}
catch (error) {

    // Display meaningful error to user/admin
    console.log(
        (error as Error).message
    );
}
