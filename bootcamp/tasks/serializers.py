from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import Client, Property,Task,ValuationReport



class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'groups')


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ('id', 'name')




class ClientSerializer(serializers.ModelSerializer):
	class Meta:
		model = Client
		fields = ('id','name','email','phone')




class PropertySerializer(serializers.ModelSerializer):
	client = ClientSerializer
	class Meta:
		model = Property
		fields = ('id','client','land_ref_number','terms_of_reference','address')






class TaskSerializer(serializers.ModelSerializer):
	client = ClientSerializer
	property_details = PropertySerializer
	assign_to = UserSerializer
	class Meta:
		model = Task
		fields = ('id','title','description','start_date','end_date','date_closed','client','property_details','assign_to')



class ValuationReportSerializer(serializers.ModelSerializer):
	class Meta:
		model = ValuationReport
		fields = ('id','name','task','report')



