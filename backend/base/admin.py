from django.contrib import admin
from .models import Order, OrderItem, Product, Review
# Register your models here.
from import_export.admin import ImportExportModelAdmin
    

admin.site.register(Product)
admin.site.register(Review)
admin.site.register(Order)
admin.site.register(OrderItem)
