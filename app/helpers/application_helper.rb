module ApplicationHelper
  def title(value)
    unless value.nil?
      @title = "#{value} | GoogleMapsTut"      
    end
  end
end
