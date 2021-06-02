<?php

use Illuminate\Database\Seeder;
use App\Product;

class ProductsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //machine for all dreamers!
        $product = Product::create([
            'name' => "SantiMachine",
            'description' => 'Machine for all dreamers!'
        ]);

        $product->addMedia(public_path('/images/product-test-2.gif'))
                ->toMediaCollection('image');
    }
}
