from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserDetails, ReciverBoy, ReciverHistory, OrderHistory, CustomerPayment



class UserDetailsSerializer(serializers.ModelSerializer):
    username = serializers.CharField(write_only=True)
    email = serializers.EmailField(write_only=True)
    password = serializers.CharField(write_only=True)

    class Meta:
        model = UserDetails
        fields = ['username', 'email', 'password', 'name', 'address', 'phone_number']
        extra_kwargs = {
            'address': {'required': False, 'default': ''},
            'phone_number': {'required': False, 'default': ''},
            'name': {'required': False, 'default': ''},
        }

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("This username is already taken.")
        return value

    def create(self, validated_data):
        username = validated_data.pop('username')
        email = validated_data.pop('email')
        password = validated_data.pop('password')

        user = User.objects.create_user(
            username=username,
            email=email,
            password=password
        )

        user_details = UserDetails.objects.create(
            user=user,
            name=validated_data.get('name', ''),
            address=validated_data.get('address', ''),
            phone_number=validated_data.get('phone_number', ''),
        )

        return user_details

class ReciverBoySerializer(serializers.ModelSerializer):
    class Meta:
        model = ReciverBoy
        fields = '__all__'

class ReciverHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ReciverHistory
        fields = '__all__'

class OrderHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderHistory
        fields = '__all__'

class CustomerPaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomerPayment
        fields = '__all__'