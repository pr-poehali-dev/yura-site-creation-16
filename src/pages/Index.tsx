import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

interface CartItem extends Product {
  quantity: number;
}

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const products: Product[] = [
    {
      id: 1,
      name: 'Профессиональный ноутбук',
      price: 89990,
      category: 'electronics',
      description: 'Высокопроизводительное устройство для бизнеса',
      image: '/placeholder.svg'
    },
    {
      id: 2,
      name: 'Деловой костюм',
      price: 24990,
      category: 'clothing',
      description: 'Классический костюм премиум качества',
      image: '/placeholder.svg'
    },
    {
      id: 3,
      name: 'Кожаный портфель',
      price: 15990,
      category: 'accessories',
      description: 'Стильный портфель из натуральной кожи',
      image: '/placeholder.svg'
    },
    {
      id: 4,
      name: 'Офисное кресло',
      price: 32990,
      category: 'furniture',
      description: 'Эргономичное кресло для работы',
      image: '/placeholder.svg'
    },
    {
      id: 5,
      name: 'Умные часы',
      price: 19990,
      category: 'electronics',
      description: 'Многофункциональные часы для делового человека',
      image: '/placeholder.svg'
    },
    {
      id: 6,
      name: 'Письменный стол',
      price: 45990,
      category: 'furniture',
      description: 'Премиальный стол для офиса',
      image: '/placeholder.svg'
    }
  ];

  const categories = [
    { id: 'all', name: 'Все товары' },
    { id: 'electronics', name: 'Электроника' },
    { id: 'clothing', name: 'Одежда' },
    { id: 'accessories', name: 'Аксессуары' },
    { id: 'furniture', name: 'Мебель' }
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200 sticky top-0 bg-white z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Store" size={32} className="text-primary" />
              <h1 className="text-2xl font-bold text-foreground">PRODАМ.COM</h1>
            </div>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="lg" className="relative">
                  <Icon name="ShoppingCart" size={20} />
                  {totalItems > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center">
                      {totalItems}
                    </Badge>
                  )}
                  <span className="ml-2 hidden sm:inline">Корзина</span>
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-lg">
                <SheetHeader>
                  <SheetTitle>Корзина</SheetTitle>
                  <SheetDescription>
                    {totalItems === 0 ? 'Ваша корзина пуста' : `Товаров в корзине: ${totalItems}`}
                  </SheetDescription>
                </SheetHeader>
                
                <div className="mt-8 space-y-4">
                  {cart.map(item => (
                    <div key={item.id} className="flex gap-4 border-b pb-4">
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">{item.price.toLocaleString('ru-RU')} ₽</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Icon name="Minus" size={14} />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Icon name="Plus" size={14} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromCart(item.id)}
                            className="ml-auto"
                          >
                            <Icon name="Trash2" size={14} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {totalItems > 0 && (
                  <div className="absolute bottom-0 left-0 right-0 p-6 border-t bg-white">
                    <div className="flex justify-between mb-4">
                      <span className="font-semibold">Итого:</span>
                      <span className="font-bold text-xl">{totalPrice.toLocaleString('ru-RU')} ₽</span>
                    </div>
                    <Button className="w-full" size="lg">
                      Оформить заказ
                    </Button>
                  </div>
                )}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <Tabs defaultValue="catalog" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
            <TabsTrigger value="catalog" className="text-base">
              <Icon name="ShoppingBag" size={18} className="mr-2" />
              Каталог
            </TabsTrigger>
            <TabsTrigger value="payment" className="text-base">
              <Icon name="CreditCard" size={18} className="mr-2" />
              Оплата
            </TabsTrigger>
          </TabsList>

          <TabsContent value="catalog">
            <div className="mb-8">
              <div className="flex flex-wrap gap-2 justify-center">
                {categories.map(cat => (
                  <Button
                    key={cat.id}
                    variant={selectedCategory === cat.id ? 'default' : 'outline'}
                    onClick={() => setSelectedCategory(cat.id)}
                  >
                    {cat.name}
                  </Button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <Card key={product.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="p-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-64 object-cover rounded-t-lg"
                    />
                  </CardHeader>
                  <CardContent className="p-6">
                    <CardTitle className="text-xl mb-2">{product.name}</CardTitle>
                    <CardDescription className="mb-4">{product.description}</CardDescription>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-primary">
                        {product.price.toLocaleString('ru-RU')}
                      </span>
                      <span className="text-xl text-muted-foreground">₽</span>
                    </div>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <Button
                      className="w-full"
                      size="lg"
                      onClick={() => addToCart(product)}
                    >
                      <Icon name="ShoppingCart" size={18} className="mr-2" />
                      В корзину
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="payment">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Способы оплаты</h2>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Icon name="CreditCard" size={24} className="text-primary" />
                      <CardTitle>Банковские карты</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Принимаем к оплате карты Visa, MasterCard, МИР. Оплата происходит через защищённое соединение.
                    </p>
                    <div className="flex gap-4">
                      <Badge variant="secondary">Visa</Badge>
                      <Badge variant="secondary">MasterCard</Badge>
                      <Badge variant="secondary">МИР</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Icon name="Wallet" size={24} className="text-primary" />
                      <CardTitle>Электронные кошельки</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Оплата через ЮMoney, QIWI, WebMoney. Мгновенное зачисление платежа.
                    </p>
                    <div className="flex gap-4">
                      <Badge variant="secondary">ЮMoney</Badge>
                      <Badge variant="secondary">QIWI</Badge>
                      <Badge variant="secondary">WebMoney</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Icon name="Building2" size={24} className="text-primary" />
                      <CardTitle>Банковский перевод</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Для юридических лиц доступна оплата по счёту. Выставление счёта в течение 1 рабочего дня.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Icon name="Package" size={24} className="text-primary" />
                      <CardTitle>Оплата при получении</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Оплата наличными или картой курьеру при получении заказа. Доступно для заказов до 50 000 ₽.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Separator className="my-8" />

              <div className="bg-muted/30 p-6 rounded-lg">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Icon name="Shield" size={20} className="text-primary" />
                  Безопасность платежей
                </h3>
                <p className="text-sm text-muted-foreground">
                  Все платежи проходят через защищённое соединение. Мы не храним данные ваших карт. 
                  Платёжная система соответствует стандарту PCI DSS.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="border-t border-gray-200 mt-16 py-8 bg-gray-50">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2024 PRODАМ.COM — Деловой маркетплейс</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
