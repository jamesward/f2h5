joo.classLoader.prepare(////////////////////////////////////////////////////////////////////////////////
//
//  ADOBE SYSTEMS INCORPORATED
//  Copyright 2005-2007 Adobe Systems Incorporated
//  All Rights Reserved.
//
//  NOTICE: Adobe permits you to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
//
////////////////////////////////////////////////////////////////////////////////

"package mx.core",/*
{

import flash.accessibility.AccessibilityProperties
import flash.display.DisplayObject
import flash.display.DisplayObjectContainer
import flash.display.IBitmapDrawable
import flash.display.LoaderInfo
import flash.display.Stage
import flash.events.IEventDispatcher
import flash.geom.Rectangle
import flash.geom.Point
import flash.geom.Transform*/

/**
 *  The IFlexDisplayObject interface defines the interface for skin elements.
 *  At a minimum, a skin must be a DisplayObject and implement this interface.
 *  
 *  @langversion 3.0
 *  @playerversion Flash 9
 *  @playerversion AIR 1.1
 *  @productversion Flex 3
 */
"public interface IFlexDisplayObject extends flash.display.IBitmapDrawable, flash.events.IEventDispatcher",function($$l,$$private){var is=joo.is,assert=joo.assert,trace=joo.trace,$$bound=joo.boundMethod,$super=$$l+'super';return[
/*

////////////////////////////////////////////////////////////////////////////////
//
//  ADOBE SYSTEMS INCORPORATED
//  Copyright 2007 Adobe Systems Incorporated
//  All Rights Reserved.
//
//  NOTICE: Adobe permits you to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
//
////////////////////////////////////////////////////////////////////////////////

/*
 *  The methods here would normally just be in IDisplayObject,
 *  but for backward compatibility, they have to be included
 *  directly into IFlexDisplayObject, so they are kept in 
 *  this separate include file.
 * /

    /**
     *  @copy flash.display.DisplayObject#root
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion Flex 3
     * /
    function root():DisplayObject;*/,/*


    /**
     *  @copy flash.display.DisplayObject#stage
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion Flex 3
     * /
    function stage():Stage;*/,/*


    /**
     *  @copy flash.display.DisplayObject#name
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion Flex 3
     * /
    function name():String;*/,/*
    function name(value:String):void;*/,/*


    /**
     *  @copy flash.display.DisplayObject#parent
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion Flex 3
     * /
    function parent():DisplayObjectContainer;*/,/*


    /**
     *  @copy flash.display.DisplayObject#mask
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion Flex 3
     * /
    function mask():DisplayObject;*/,/*
    function mask(value:DisplayObject):void;*/,/*


    /**
     *  @copy flash.display.DisplayObject#visible
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion Flex 3
     * /
    function visible():Boolean;*/,/*
    function visible(value:Boolean):void;*/,/*


    /**
     *  @copy flash.display.DisplayObject#x
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion Flex 3
     * /
    function x():Number;*/,/*
    function x(value:Number):void;*/,/*


    /**
     *  @copy flash.display.DisplayObject#y
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion Flex 3
     * /
    function y():Number;*/,/*
    function y(value:Number):void;*/,/*


    /**
     *  @copy flash.display.DisplayObject#scaleX
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion Flex 3
     * /
    function scaleX():Number;*/,/*
    function scaleX(value:Number):void;*/,/*


    /**
     *  @copy flash.display.DisplayObject#scaleY
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion Flex 3
     * /
    function scaleY():Number;*/,/*
    function scaleY(value:Number):void;*/,/*


    /**
     *  @copy flash.display.DisplayObject#mouseX
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion Flex 3
     * /
    function mouseX():Number;*/,/* // note: no setter


    /**
     *  @copy flash.display.DisplayObject#mouseY
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion Flex 3
     * /
    function mouseY():Number;*/,/* // note: no setter


    /**
     *  @copy flash.display.DisplayObject#rotation
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion Flex 3
     * /
    function rotation():Number;*/,/*
    function rotation(value:Number):void;*/,/*


    /**
     *  @copy flash.display.DisplayObject#alpha
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion Flex 3
     * /
    function alpha():Number;*/,/*
    function alpha(value:Number):void;*/,/*


    /**
     *  @copy flash.display.DisplayObject#width
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion Flex 3
     * /
    function width():Number;*/,/*
    function width(value:Number):void;*/,/*

    /**
     *  @copy flash.display.DisplayObject#height
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion Flex 3
     * /
    function height():Number;*/,/*
    function height(value:Number):void;*/,/*


    /**
     *  @copy flash.display.DisplayObject#cacheAsBitmap
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion Flex 3
     * /
    function cacheAsBitmap():Boolean;*/,/*
    function cacheAsBitmap(value:Boolean):void;*/,/*

    /**
     *  @copy flash.display.DisplayObject#opaqueBackground
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion Flex 3
     * /
    function opaqueBackground():Object;*/,/*
    function opaqueBackground(value:Object):void;*/,/*


    /**
     *  @copy flash.display.DisplayObject#scrollRect
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion Flex 3
     * /
    function scrollRect():Rectangle;*/,/*
    function scrollRect(value:Rectangle):void;*/,/*


    /**
     *  @copy flash.display.DisplayObject#filters
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion Flex 3
     * /
    function filters():Array;*/,/*
    function filters(value:Array):void;*/,/*

    /**
     *  @copy flash.display.DisplayObject#blendMode
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion Flex 3
     * /
    function blendMode():String;*/,/*
    function blendMode(value:String):void;*/,/*

    /**
     *  @copy flash.display.DisplayObject#transform
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion Flex 3
     * /
    function transform():Transform;*/,/*
    function transform(value:Transform):void;*/,/*

    /**
     *  @copy flash.display.DisplayObject#scale9Grid
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion Flex 3
     * /
    function scale9Grid():Rectangle;*/,/*
    function scale9Grid(innerRectangle:Rectangle):void;*/,/*

    /**
     *  @copy flash.display.DisplayObject#globalToLocal()
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion Flex 3
     * /
    function globalToLocal(point:Point):Point;*/,/*

    /**
     *  @copy flash.display.DisplayObject#localToGlobal()
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion Flex 3
     * /
    function localToGlobal(point:Point):Point;*/,/*

    /**
     *  @copy flash.display.DisplayObject#getBounds()
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion Flex 3
     * /
    function getBounds(targetCoordinateSpace:DisplayObject):Rectangle;*/,/*

    /**
     *  @copy flash.display.DisplayObject#getRect()
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion Flex 3
     * /
    function getRect(targetCoordinateSpace:DisplayObject):Rectangle;*/,/*

    /**
     *  @copy flash.display.DisplayObject#loaderInfo
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion Flex 3
     * /
    function loaderInfo() : LoaderInfo;*/,/*

    /**
     *  @copy flash.display.DisplayObject#hitTestObject()
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion Flex 3
     * /
    function hitTestObject(obj:DisplayObject):Boolean;*/,/*

    /**
     *  @copy flash.display.DisplayObject#hitTestPoint()
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion Flex 3
     * /
    function hitTestPoint(x:Number, y:Number, shapeFlag:Boolean=false):Boolean;*/,/*

    /**
     *  @copy flash.display.DisplayObject#accessibilityProperties
     *  
     *  @langversion 3.0
     *  @playerversion Flash 9
     *  @playerversion AIR 1.1
     *  @productversion Flex 3
     * /
    function accessibilityProperties() : AccessibilityProperties;*/,/*
    function accessibilityProperties( value : AccessibilityProperties ) : void;*/,/*
    


	//--------------------------------------------------------------------------
	//
	//  Properties
	//
	//--------------------------------------------------------------------------


	//----------------------------------
	//  measuredHeight
	//----------------------------------

	/**
	 *  The measured height of this object.
	 *
	 *  <p>This is typically hard-coded for graphical skins
	 *  because this number is simply the number of pixels in the graphic.
	 *  For code skins, it can also be hard-coded
	 *  if you expect to be drawn at a certain size.
	 *  If your size can change based on properties, you may want
	 *  to also be an ILayoutManagerClient so a <code>measure()</code>
	 *  method will be called at an appropriate time,
	 *  giving you an opportunity to compute a <code>measuredHeight</code>.</p>
	 *  
	 *  @langversion 3.0
	 *  @playerversion Flash 9
	 *  @playerversion AIR 1.1
	 *  @productversion Flex 3
	 * /
	function measuredHeight():Number;*/,/*

	//----------------------------------
	//  measuredWidth
	//----------------------------------

	/**
	 *  The measured width of this object.
	 *
	 *  <p>This is typically hard-coded for graphical skins
	 *  because this number is simply the number of pixels in the graphic.
	 *  For code skins, it can also be hard-coded
	 *  if you expect to be drawn at a certain size.
	 *  If your size can change based on properties, you may want
	 *  to also be an ILayoutManagerClient so a <code>measure()</code>
	 *  method will be called at an appropriate time,
	 *  giving you an opportunity to compute a <code>measuredHeight</code>.</p>
	 *  
	 *  @langversion 3.0
	 *  @playerversion Flash 9
	 *  @playerversion AIR 1.1
	 *  @productversion Flex 3
	 * /
	function measuredWidth():Number;*/,/*


	//--------------------------------------------------------------------------
	//
	//  Methods
	//
	//--------------------------------------------------------------------------

	/**
	 *  Moves this object to the specified x and y coordinates.
	 * 
	 *  @param x The new x-position for this object.
	 * 
	 *  @param y The new y-position for this object.
	 *  
	 *  @langversion 3.0
	 *  @playerversion Flash 9
	 *  @playerversion AIR 1.1
	 *  @productversion Flex 3
	 * /
	function move(x:Number, y:Number):void;*/,/*

	/**
	 *  Sets the actual size of this object.
	 *
	 *  <p>This method is mainly for use in implementing the
	 *  <code>updateDisplayList()</code> method, which is where
	 *  you compute this object's actual size based on
	 *  its explicit size, parent-relative (percent) size,
	 *  and measured size.
	 *  You then apply this actual size to the object
	 *  by calling <code>setActualSize()</code>.</p>
	 *
	 *  <p>In other situations, you should be setting properties
	 *  such as <code>width</code>, <code>height</code>,
	 *  <code>percentWidth</code>, or <code>percentHeight</code>
	 *  rather than calling this method.</p>
	 * 
	 *  @param newWidth The new width for this object.
	 * 
	 *  @param newHeight The new height for this object.
	 *  
	 *  @langversion 3.0
	 *  @playerversion Flash 9
	 *  @playerversion AIR 1.1
	 *  @productversion Flex 3
	 * /
	function setActualSize(newWidth:Number, newHeight:Number):void;*/,
];},[],["flash.display.IBitmapDrawable","flash.events.IEventDispatcher"]

);