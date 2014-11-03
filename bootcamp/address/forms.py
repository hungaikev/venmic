from django import forms
from address.models import Country, State,Locality,Address


class CountryForm(forms.ModelForm):
	class Meta:
		model = Country

class StateForm(forms.ModelForm):
	class Meta:
		model = State

class AddressForm(forms.ModelForm):
	class Meta:
		model = Address


class LocalityForm(forms.ModelForm):
	class Meta:
		model = Locality
