from django.db import models
from django.contrib.auth.models import User



class UserDetails(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=15)

    def __str__(self):
        return self.name
    
class ReciverBoy(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=15)

    def __str__(self):
        return self.name

class ReciverHistory(models.Model):
    reciver = models.ForeignKey(ReciverBoy, on_delete=models.CASCADE)
    order_user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True) 
    orderid = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.reciver.name} - {self.order_details[:20]}"
    
    
class OrderHistory(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    reciver = models.ForeignKey(ReciverBoy, on_delete=models.SET_NULL, null=True)
    order_details = models.TextField()
    orderid = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.user.username} - {self.order_details[:20]}"


class CustomerPayment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    card_number = models.CharField(max_length=16)
    expiry_date = models.CharField(max_length=5)
    cvv = models.CharField(max_length=3)

    def __str__(self):
        return f"{self.user.username} - {self.card_number[-4:]}"