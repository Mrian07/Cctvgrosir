import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckTutorial } from './providers/check-tutorial.service';
import { AuthGuardService } from './providers/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/product',
    pathMatch: 'full'
  },
  {
    path: 'account',
    loadChildren: () => import('./pages/account/account.module').then(m => m.AccountModule)
  },
  {
    path: 'support',
    loadChildren: () => import('./pages/support/support.module').then(m => m.SupportModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignUpModule)
  },
  {
    path: 'app',
    loadChildren: () => import('./pages/tabs-page/tabs-page.module').then(m => m.TabsModule)
  },
  {
    path: 'tutorial',
    loadChildren: () => import('./pages/tutorial/tutorial.module').then(m => m.TutorialModule),
    canLoad: [CheckTutorial]
  },
  {
    path: 'product',
    loadChildren: () => import('./product/product.module').then( m => m.ProductPageModule)
  },
  // {
  //   path: 'product-filter',
  //   loadChildren: () => import('./product-filter/product-filter.module').then( m => m.ProductFilterPageModule)
  // },
  {
    path: 'product-detail/:id',
    loadChildren: () => import('./product-detail/product-detail.module').then( m => m.ProductDetailPageModule)
  },
  // {
  //   path: 'checkout',
  //   loadChildren: () => import('./checkout/checkout.module').then( m => m.CheckoutPageModule)
  // },
  { path: 'checkout', loadChildren: './checkout/checkout.module#CheckoutPageModule' },

  {
    path: 'pengiriman',
    loadChildren: () => import('./pengiriman/pengiriman.module').then( m => m.PengirimanPageModule)
  },
  {
    path: 'blog',
    loadChildren: () => import('./pages/blog/blog.module').then( m => m.BlogPageModule)
  },
  {
    path: 'detail-blog',
    loadChildren: () => import('./pages/detail-blog/detail-blog.module').then( m => m.DetailBlogPageModule)
  },
  {
    path: 'pesan',
    loadChildren: () => import('./pages/pesan/pesan.module').then( m => m.PesanPageModule)
  },
  {
    path: 'wallet',
    loadChildren: () => import('./pages/wallet/wallet.module').then( m => m.WalletPageModule)
  },
  {
    path: 'riwayat-order',
    loadChildren: () => import('./pages/riwayat-order/riwayat-order.module').then( m => m.RiwayatOrderPageModule)
  },
  {
    path: 'kontak',
    loadChildren: () => import('./pages/kontak/kontak.module').then( m => m.KontakPageModule)
  },
  {
    path: 'cek-ongkir',
    loadChildren: () => import('./pages/cek-ongkir/cek-ongkir.module').then( m => m.CekOngkirPageModule)
  },
  {
    path: 'referral',
    loadChildren: () => import('./pages/referral/referral.module').then( m => m.ReferralPageModule)
  },
  {
    path: 'konfirmasi/:id',
    loadChildren: () => import('./pages/konfirmasi/konfirmasi.module').then( m => m.KonfirmasiPageModule)
  },
  {
    path: 'riwayat-order-detail/:id',
    loadChildren: () => import('./pages/riwayat-order-detail/riwayat-order-detail.module').then( m => m.RiwayatOrderDetailPageModule)
  },
  {
    path: 'cek-onkir',
    loadChildren: () => import('./pages/cek-onkir/cek-onkir.module').then( m => m.CekOnkirPageModule)
  },
  {
    path: 'lupa-password',
    loadChildren: () => import('./pages/lupa-password/lupa-password.module').then( m => m.LupaPasswordPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/free/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'sub1/:opt',
    loadChildren: () => import('./pages/free/sub1/sub1.module').then( m => m.Sub1PageModule)
  },
  {
    path: 'searchbar',
    loadChildren: () => import('./pages/free/searchbar/searchbar.module').then( m => m.SearchbarPageModule)
  },
  {
    path: 'searchbar',
    loadChildren: () => import('./pages/free/searchbar/searchbar.module').then( m => m.SearchbarPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation : 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
